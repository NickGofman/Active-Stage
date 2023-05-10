'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../database');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  pool.query(
    'SELECT * FROM user WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log(JSON.stringify(results));
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      // get user info
      const user = results[0];
      // compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      res.json({ message: 'User logged in successfully.' });
    }
  );
});

module.exports = router;
