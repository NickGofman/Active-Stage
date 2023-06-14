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
  //getAllAssignMusicians,
  getThreeEventsToAssign,
  getAllUsersPerEvent,
  assignMusicianToEventById,
  getEventsPassedWithoutIncome,
  getSortedEventDataByType,
  addIncome,
  getUpcomingEvents,
  cancelEvent,
} = require('../controllers/adminEvents.js');

router.post('/updateProfile', updateProfile);
router.post('/createEvent', createEvent);
router.post(
  '/assignMusicianToEventById/:EventID/:UserId',
  assignMusicianToEventById
);
router.post('/addIncome/:EventID', addIncome);

router.get('/getMusicalStyles', getMusicalStyles);
router.get('/profile/:id', getAdminData);
router.get('/eventsDates', getEventsDate);
// router.get('/getAllAssignMusicians', getAllAssignMusicians);
router.get('/getThreeEventsToAssign', getThreeEventsToAssign);
router.get('/getAllUsersPerEvent/:EventID', getAllUsersPerEvent);
router.get('/getEventsPassedWithoutIncome', getEventsPassedWithoutIncome);
router.get('/getUpcomingEvents', getUpcomingEvents);
router.get(
  '/getSortedEventDataByType/:sortType/:startDate/:endDate',
  getSortedEventDataByType
);
router.post('/cancelEvent/:eventId', cancelEvent);

getUpcomingEvents;
module.exports = router;
