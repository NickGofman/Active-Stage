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

const handleMulterErrors = (err, req, res, next) => {
  if (err) {
    res.status(400).json({ message: err.message });
  } else {
    next();
  }
};

app.post('/upload', (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ message: 'No file provided.' });
  }

  const file = req.files.file;
  const oldPhoto = req.body.oldPhoto;

  file.mv(path.join(uploadDir, file.name), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file.' });
    }

    if (oldPhoto) {
      unlink(path.join(uploadDir, oldPhoto), (error) => {
        if (error) {
          console.log('Error deleting old photo:', error);
          return res.status(500).json({ message: 'Error deleting old photo.' });
        }

        console.log(`./UploadImages/${oldPhoto} was deleted`);
        res.status(200).json(file.name);
      });
    } else {
      res.status(200).json(file.name);
    }
  });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
