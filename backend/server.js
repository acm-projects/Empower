require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
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

// connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

//User routes
const userRouter = require("./routes/users.js");
app.use("/users", userRouter);

//file routes
/*
var upload = multer({
    dest: '/file',
    storage: multer.memoryStorage()
});
*/
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
upload.single("myFile");

app.get("/file", async (req, res) => {
  try {
    res.send("hello");
    const files = await File.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/file", upload.single("myFile"), async (req, res) => {
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

  res.send(req.file);
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
