require("dotenv").config();

const axios = require("axios"); 

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } = require('@aws-sdk/client-transcribe')
const { PollyClient, SynthesizeSpeechCommand } = require('@aws-sdk/client-polly');
const { Readable } = require('stream');
const router = express.Router();
const File = require("./models/file");
module.exports = router;

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const transcribe = new TranscribeClient({
  region: bucketRegion,
  credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretAccessKey,
  }
});

const polly = new PollyClient({ 
  region: bucketRegion,
  credentials: { 
    accessKeyId: accessKey, secretAccessKey: secretAccessKey 
  }
 });

// connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

//User routes
const userRouter = require("./routes/users.js");
app.use("/users", userRouter);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/file", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// *** TRANSCRIPTION JOB ***
app.post("/transcribe", upload.single("myFile"), async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  req.file.buffer;

  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: req.file.buffer,
    contentType: req.file.type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

    // unique transcription job name by appending current timestamp
    const transcriptionJobName = `transcription-job-${Date.now()}`;
    const mediaFileUri = `s3://${bucketName}/${params.Key}`;

    const transcriptionParams = {
        TranscriptionJobName: transcriptionJobName,
        Media: { MediaFileUri: mediaFileUri },
        MediaFormat: 'mp3',
        LanguageCode: 'en-US'
      };

      try {
        const transcriptionJob = await transcribe.send(new StartTranscriptionJobCommand(transcriptionParams));
        console.log(`Transcription job ${transcriptionJob.TranscriptionJob.TranscriptionJobName} started.`);

        const { TranscriptionJob } = await transcribe.send(new GetTranscriptionJobCommand({ TranscriptionJobName: transcriptionJobName}));
        let transcriptionJobStatus = TranscriptionJob.TranscriptionJobStatus;
        let transcriptionResultUri;

        while (transcriptionJobStatus === 'IN_PROGRESS') {
          const { TranscriptionJob } = await transcribe.send(new GetTranscriptionJobCommand({ TranscriptionJobName: transcriptionJobName}));
          transcriptionJobStatus = TranscriptionJob.TranscriptionJobStatus;
          await new Promise(resolve => setTimeout(resolve, 1000));

          if (transcriptionJobStatus === 'COMPLETED') {
            const transcriptionResultUri = TranscriptionJob.Transcript.TranscriptFileUri;
            const response = await fetch(transcriptionResultUri);
            const transcription = await response.text();
            res.send(transcription);
            console.log('Transcription complete.')
            return;
          } 
          else if (transcriptionJobStatus === 'FAILED') {
            res.status(500).send(`Transcription job failed: ${TranscriptionJob.FailureReason}`);
            return;
          } 
          //status updates every second
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (!transcriptionResultUri) {
          res.status(500).send(`Error retrieving transcription result.`);
          return;
        }
      } catch (err) {
        console.log(`Error starting transcription job: ${err}`);
        res.status(500).send(err);
      }
});

// *** POLLY JOB ***
app.post("/polly", async (req, res) => {
      try {
        const text = req.body.text;
        // customizable voiceId, joanna by default
        const voiceId = req.body.voiceId ? req.body.voiceId : "Joanna";

        if (!text) {
          return res.status(400).json({ message: "Text value is missing or empty" });
        }        
  
        const pollyParams = {
          OutputFormat: "mp3",
          Text: text,
          VoiceId: voiceId,
        }; 
  
        const command = new SynthesizeSpeechCommand(pollyParams);
        const { AudioStream } = await polly.send(command);
        const audioStream = Readable.from(AudioStream);
  
        res.set("Content-Type", "audio/mpeg");
        audioStream.pipe(res);

        console.log("Polly job complete")

        } catch(err) {
          console.error(err);
          res.status(500).json({ message: "Failed to synthesize speech" });
        } 
});

router.delete("/file/:id", getFile, async (req, res) => {
  try {
    await res.file.deleteOne();
    res.json({ message: "Deleted File" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getFile(req, res, next) {
  let file;
  try { 
    file = await File.findById(req.params.id);
    if (file == null) {
      return res.status(404).json({ message: "Cannot find file" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.file = file;
  next();
}

app.listen(3000, () => console.log("Server Started"));
module.exports = router;
