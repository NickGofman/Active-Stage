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
  cancelPassedEvents,
  getThreeEventsToAssign,
  getAllUsersPerEvent,
  assignMusicianToEventById,
  getEventsPassedWithoutIncome,
  getSortedEventDataByType,
  addIncome,
  getUpcomingEvents,
  cancelEvent,
  updateEvent,
} = require('../controllers/adminEvents.js');

const {
  getBandNames,
  getFilteredReports,
} = require('../controllers/adminReports.js');
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
router.post('/getFilteredReports', getFilteredReports);

router.get('/getBandNames/:startDate/:endDate', getBandNames);
getBandNames;

router.post('/cancelEvent/:eventId', cancelEvent);
router.post('/updateEvent/:eventId', updateEvent);
router.post('/cancelPassedEvents', cancelPassedEvents);

getUpcomingEvents;
module.exports = router;
