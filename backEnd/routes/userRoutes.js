'use strict';

const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getProfile,
  getOpenEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,
  getUserPhoto,
} = require('../controllers/userProfile.js');

router.post('/updateProfile', updateProfile);
router.post('/registerToEvent/:id/:eventId/:email', registerToEvent);

router.get('/profile/:id', getProfile);
router.get('/getAllPublishedEvents/:id', getOpenEvents);
router.get('/getAllAssignedEvents/:id', getAssignedEvents);

router.get('/getAllRegisteredEvents/:id', getRegisteredEvents);

;
router.get('/profile/photo/:id', getUserPhoto);

;

module.exports = router;
