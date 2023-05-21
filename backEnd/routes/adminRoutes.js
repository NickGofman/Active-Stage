'use strict';

const express = require('express');
const router = express.Router();
const { updateProfile, getAdminData } = require('../controllers/admin.js');
const {
  createEvent,
  getMusicalStyles,
} = require('../controllers/adminEvents.js');

router.post('/updateProfile', updateProfile);
router.post('/createEvent', createEvent);
router.get('/getMusicalStyles', getMusicalStyles);
router.get('/profile/:id', getAdminData);

module.exports = router;
