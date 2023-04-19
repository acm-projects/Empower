require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const AWS = require('aws-sdk')
//const fs = require('fs')
const { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } = require('@aws-sdk/client-transcribe')
const File = require('./models/file')

const router = express.Router();
module.exports = router

const multer = require('multer')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});

const transcribe = new TranscribeClient({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
  });

// connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

// user routes
const userRouter = require('./routes/users.js')
app.use('/users', userRouter)
app.listen(3000, () => console.log('Server Started'))

// file routes
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get("/file", async (req, res) => {
        try {
            const files = await File.find()
            res.json(files)
    
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
})

app.post("/file", upload.single('myFile'), async (req, res) => {
    console.log("req.body", req.body)
    console.log("req.file", req.file)

    // buffer is needed to access, modify, send image data
    req.file.buffer
    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.type
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    // *** TRANSCRIPTION JOB ***

    // unique transcription job name by appending current timestamp
    const transcriptionJobName = `transcription-job-${Date.now()}`;
    const mediaFileUri = `s3://${bucketName}/${params.Key}`;

    const transcriptionParams = {
        TranscriptionJobName: transcriptionJobName,
        Media: { MediaFileUri: mediaFileUri },
        MediaFormat: 'wav',
        LanguageCode: 'en-US'
      };

      try {
        const transcriptionJob = await transcribe.send(new StartTranscriptionJobCommand(transcriptionParams));
        console.log(`Transcription job ${transcriptionJob.TranscriptionJob.TranscriptionJobName} started.`);

        // get transcription result and send it as response
        const { TranscriptionJob } = await transcribe.send(new GetTranscriptionJobCommand({ TranscriptionJobName: transcriptionJobName}));
        const transcriptionResultUri = TranscriptionJob.Transcript.TranscriptFileUri;

        const response = await fetch(transcriptionResultUri);
        const transcription = await response.text();
        
        res.send(transcription);

      } catch (err) {
        console.log(`Error starting transcription job: ${err}`);
        res.status(500).send(err);
      }

    // END

    //res.send(req.file)
})

router.delete('/file/:id', getFile, async (req, res) => {
    try{
        await res.file.deleteOne()
        res.json({ message: 'Deleted File' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

async function getFile(req, res, next) {
    let file
    try{   
        file = await File.findById(req.params.id)
        if (file == null){
            return res.status(404).json({ message: 'Cannot find file'})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.file = file
    next()
}

module.exports = router;
