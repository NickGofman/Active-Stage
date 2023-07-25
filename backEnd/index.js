const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const { unlink } = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const port = process.env.PORT || 3001;

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
app.use(express.static(path.join(__dirname, 'UploadImages')));
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, 'UploadImages');
const maxSize = 1 * 1024 * 1024; //~1MB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './UploadImages');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// Middleware to handle file size error and other Multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle file size error
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ message: 'File size exceeds the limit 1MB' });
    } else {
      // Handle other Multer errors
      return res.status(400).json({ message: err.message });
    }
  } else if (err) {
    // An unknown error occurred when uploading.
    return res.status(500).json({ message: err.message });
  }
  next();
};

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: { fileSize: maxSize },
}).single('file');

app.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      handleMulterErrors(err, req, res, next);
    } else {
      const file = req.file;
      const oldPhoto = req.body.oldPhoto;
      console.log("In '/upload' INDEX: ", oldPhoto);

      // Delete the old photo
      if (!oldPhoto === '') {
        console.log("In '/upload' oldPhoto: ", oldPhoto);

        unlink(`./UploadImages/${oldPhoto}`, (error) => {
          if (error) {
            console.log('Error deleting old photo:', error);
            res.status(500).json('Error deleting old photo');
          } else {
            console.log(`./UploadImages/${oldPhoto} was deleted`);
            res.status(200).json(file.filename);
          }
        });
      } else {
        res.status(200).json(file.filename);
      }
    }
  });
});
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
