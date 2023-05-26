'use strict';

const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getProfile,
  getOpenEvents,
} = require('../controllers/userProfile.js');

router.post('/updateProfile', updateProfile);
router.get('/profile/:id', getProfile);
router.get('/getAllPublishedEvents/:id', getOpenEvents);
module.exports = router;
