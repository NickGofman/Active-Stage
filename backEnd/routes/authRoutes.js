'use strict';

const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  forgotPassword,
  changePassword,
} = require('../controllers/auth.js');

//#region  ================ Auth Routes ======================
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.post('/changePassword', changePassword);
//#endregion

module.exports = router;
