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
} = require('../controllers/adminEvents.js');

router.post('/updateProfile', updateProfile);
router.post('/createEvent', createEvent);
router.get('/getMusicalStyles', getMusicalStyles);
router.get('/profile/:id', getAdminData);
router.get('/eventsDates', getEventsDate);
router.get('/getAllAssignMusicians;', getAllAssignMusicians);

module.exports = router;
