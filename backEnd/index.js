const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { unlink } = require('fs');

const port = process.env.port || 3001;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './UploadImages');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // add catch to the error
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const oldPhoto = req.body.oldPhoto;
  console.log("In '/upload' INDEX: ", oldPhoto);
  // Delete the old photo
  if (oldPhoto) {
    try {
      unlink(`./UploadImages/${oldPhoto}`, (err) => {
        if (err) throw err;
        console.log(`./UploadImages/${oldPhoto} was deleted`);
      });
    } catch (error) {
      console.log('Error deleting old photo:', error);
    }
  }
  res.status(200).json(file.filename);
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`WE ARE RUNNING PORT: ${port}`);
});
