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
  getAllAssignMusicians,
  getThreeUpcomingEvents,
  getAllUsersPerEvent,
  assignMusicianToEventById,
} = require('../controllers/adminEvents.js');

router.post('/updateProfile', updateProfile);
router.post('/createEvent', createEvent);
router.post('/assignMusicianToEventById/:EventID/:UserId', assignMusicianToEventById);


router.get('/getMusicalStyles', getMusicalStyles);
router.get('/profile/:id', getAdminData);
router.get('/eventsDates', getEventsDate);
router.get('/getAllAssignMusician', getAllAssignMusicians);
router.get('/getThreeUpcomingEvents', getThreeUpcomingEvents);
router.get('/getAllUsersPerEvent/:EventID', getAllUsersPerEvent);

module.exports = router;
