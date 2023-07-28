const { unlink } = require('fs');
const path = require('path');
const multer = require('multer');

const maxSize = 2 * 1024 * 1024; //~2MB

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

const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ message: 'File size exceeds the limit 2MB' });
    } else {
      return res.status(400).json({ message: err.message });
    }
  } else if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
};

const handleImageUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      handleMulterErrors(err, req, res, next);
    } else {
      const file = req.file;
      const oldPhoto = req.body.oldPhoto;

      if (!oldPhoto === '') {
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
};

module.exports = {
  handleImageUpload,
};
