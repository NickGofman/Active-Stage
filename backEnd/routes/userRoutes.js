'use strict';

const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/userProfile.js');

const {
  getPublishedEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,
  unregisterToEvent,
  getAllPreviousEvents,
} = require('../controllers/userEvents.js');

//#region  ================ Profile Page Routes ======================
router.post('/updateProfile', updateProfile);
router.get('/profile/:id', getProfile);
//#endregion

//#region  ================ Events Routes ======================
router.post('/registerToEvent/:id/:eventId/:email', registerToEvent);
router.get('/getAllPublishedEvents/:id', getPublishedEvents);
router.get('/getAllAssignedEvents/:id', getAssignedEvents);
router.get('/getAllRegisteredEvents/:id', getRegisteredEvents);
router.post('/unregisterToEvent/:userId/:eventId', unregisterToEvent);
router.get('/getAllPreviousEvents/:userId', getAllPreviousEvents);
//#endregion

module.exports = router;
