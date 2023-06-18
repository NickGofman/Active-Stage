'use strict';

const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getProfile,
  getPublishedEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,

  unregisterToEvent,
} = require('../controllers/userProfile.js');

router.post('/updateProfile', updateProfile);
router.post('/registerToEvent/:id/:eventId/:email', registerToEvent);

router.get('/profile/:id', getProfile);
router.get('/getAllPublishedEvents/:id', getPublishedEvents);
router.get('/getAllAssignedEvents/:id', getAssignedEvents);

router.get('/getAllRegisteredEvents/:id', getRegisteredEvents);

router.post('/unregisterToEvent/:userId/:eventId', unregisterToEvent);

module.exports = router;
