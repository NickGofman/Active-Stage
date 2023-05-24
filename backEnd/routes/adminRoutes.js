'use strict';

const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getAdminData,
} = require('../controllers/adminProfile.js');
const {
  createEvent,
  getMusicalStyles,
  getEventsDate,
} = require('../controllers/adminEvents.js');

router.post('/updateProfile', updateProfile);
router.post('/createEvent', createEvent);
router.get('/getMusicalStyles', getMusicalStyles);
router.get('/profile/:id', getAdminData);
router.get('/eventsDates', getEventsDate);

module.exports = router;
