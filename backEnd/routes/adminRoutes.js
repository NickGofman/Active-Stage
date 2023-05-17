'use strict';

const express = require('express');
const router = express.Router();
const { updateProfile, getAdminData } = require('../controllers/admin.js');

router.post('/updateProfile', updateProfile);
router.get('/profile/:id', getAdminData);
module.exports = router;