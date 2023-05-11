'use strict';
const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../database');
const statusEnum = {
  ACTIVE: 'Active',
  BANNED: 'Banned',
};

const roleEnum = {
  BUSINESS: 'Business',
  MUSICIAN: 'Musician',
};
router.post('/register', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    email,
    password,
    phoneNumber,
    yearsOfExperience,
    description,
    birthDate,
    bandName,
    photo,
    firstName,
    lastName,
  } = req.body;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert into user table
  pool.query(
    'INSERT INTO user (email, password, phone_number, status, role) VALUES (?, ?, ?, ?, ?)',
    [email, hashedPassword, phoneNumber, statusEnum.ACTIVE, roleEnum.MUSICIAN],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // insert into musician table
      pool.query(
        'INSERT INTO musician (email, user_id, years_of_experience, description, birth_date, band_name, photo, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          email,
          result.insertId,
          yearsOfExperience,
          description,
          birthDate,
          bandName,
          photo,
          firstName,
          lastName,
        ],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: 'Musician registered successfully.' });
        }
      );
    }
  );
});
module.exports = router;
