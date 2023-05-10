'use strict';
const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../database');

router.post('/register', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query(
    'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err) => {
      console.log(email);
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'User registered successfully.' });
    }
  );
});

module.exports = router;
