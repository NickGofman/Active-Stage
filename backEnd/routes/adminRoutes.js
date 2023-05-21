'use strict';

const express = require('express');
const router = express.Router();
const { updateProfile, getAdminData } = require('../controllers/admin.js');
const { createEvent } = require('../controllers/adminEvents.js');

router.post('/updateProfile', updateProfile);
router.post('/createEvent', createEvent);

router.get('/profile/:id', getAdminData);

module.exports = router;
