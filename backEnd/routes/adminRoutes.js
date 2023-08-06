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
  getMusicalStylesByDate,
} = require('../controllers/adminReports.js');
const {
  blockUserAndUnassignEvents,
  addNewMusicalStyle,
} = require('../controllers/adminActivities.js');

//#region  ================ Events Routs ======================
router.post('/createEvent', createEvent);
router.post(
  '/assignMusicianToEventById/:EventID/:UserId',
  assignMusicianToEventById
);
router.post('/addIncome/:EventID', addIncome);
router.get('/eventsDates', getEventsDate);
router.get('/getEventsForCalendar', getEventsForCalendar);
router.get('/getThreeUpcomingEvents', getThreeUpcomingEvents);
//#endregion

//#region  ================ Profile Page Routes ======================
router.get('/profile/:id', getAdminData);
router.post('/updateProfile', updateProfile);
//#endregion

//#region  ================ All Events Routes ======================
router.get('/getMusicalStyles', getMusicalStyles);
router.get('/getThreeEventsToAssign', getThreeEventsToAssign);
router.get('/getAllUsersPerEvent/:EventID', getAllUsersPerEvent);
router.get('/getEventsPassedWithoutIncome', getEventsPassedWithoutIncome);
router.post('/updateEvent/:eventId/:status', updateEvent);
//#endregion


//#region  ================ Reports Routes ======================
router.get(
  '/getSortedEventDataByType/:sortType/:startDate/:endDate',
  getSortedEventDataByType
);
router.post('/getFilteredReports', getFilteredReports);
router.post('/getBandNames', getBandNames);
router.post('/getMusicalStylesByDate', getMusicalStylesByDate);
router.post('/cancelEvent/:eventId/:status', cancelEvent);
router.post('/cancelPassedEvents', cancelPassedEvents);
//#endregion

//#region  ================ Admin Activities Routes ======================
router.post('/blockUser/:userId', blockUserAndUnassignEvents);
router.post('/addNewMusicalStyle/:musicalStyleName', addNewMusicalStyle);
//#endregion

module.exports = router;
