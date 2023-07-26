const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { handleImageUpload } = require('./uploadController'); // Import the upload controller
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

app.post('/upload', handleImageUpload); // Use the handleImageUpload function for /upload route

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
