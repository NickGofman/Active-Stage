'use strict';

const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/user.js');

router.post('/updateProfile', updateProfile);
module.exports = router;
