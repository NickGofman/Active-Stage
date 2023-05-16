'use strict';

const express = require('express');
const router = express.Router();
const { uploadImage, updateProfile } = require('../controllers/profile.js');

router.post('/upload', uploadImage);

router.post('/updateProfile', updateProfile);

module.exports = router;
