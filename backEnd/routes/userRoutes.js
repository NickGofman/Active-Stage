'use strict';

const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/user.js');

router.post('/updateProfile', updateProfile);
router.get('/profile/:id', getProfile);
module.exports = router;
