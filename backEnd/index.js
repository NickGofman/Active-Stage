'use strict';

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

// Set up express to use JSON
app.use(express.json());

// Enable CORS for requests coming from http://localhost:3000
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// Parse cookies from incoming requests
app.use(cookieParser());

// Serve static files from the 'UploadImages' directory
app.use(express.static(path.join(__dirname, 'UploadImages')));
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle image uploads using the 'handleImageUpload' function
app.post('/upload', handleImageUpload);

//middlewears to handle auth, user and admin requests
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
