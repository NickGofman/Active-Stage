'use strict';

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  forgotPassword,
} = require('../controllers/auth.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
