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
  getEventsForCalendar,
  getThreeUpcomingEvents,
  cancelEvent,
  updateEvent,
} = require('../controllers/adminEvents.js');

const {
  getBandNames,
  getFilteredReports,
} = require('../controllers/adminReports.js');
const {
  blockUserAndUnassignEvents,
  addNewMusicalStyle,
} = require('../controllers/adminActivities.js');
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
router.get('/getEventsForCalendar', getEventsForCalendar);

router.get('/getThreeUpcomingEvents', getThreeUpcomingEvents);

router.get(
  '/getSortedEventDataByType/:sortType/:startDate/:endDate',
  getSortedEventDataByType
);
router.post('/getFilteredReports', getFilteredReports);

router.get('/getBandNames/:startDate/:endDate', getBandNames);

router.post('/cancelEvent/:eventId/:status', cancelEvent);
router.post('/updateEvent/:eventId/:status', updateEvent);
router.post('/cancelPassedEvents', cancelPassedEvents);

router.post('/blockUser/:userId', blockUserAndUnassignEvents);
router.post('/addNewMusicalStyle/:musicalStyleName', addNewMusicalStyle);

module.exports = router;
