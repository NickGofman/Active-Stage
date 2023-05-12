'use strict';
const bcrypt = require('bcrypt');
const pool = require('../database');
const jwt = require('jsonwebtoken');

const statusEnum = {
  ACTIVE: 'Active',
  BANNED: 'Banned',
};

const roleEnum = {
  BUSINESS: 'Business',
  MUSICIAN: 'Musician',
};

const register = async (req, res) => {
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
    url,
  } = req.body;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check if user exist
  pool.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(result);
    if (result.length > 0) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // insert into user table
    pool.query(
      'INSERT INTO user (email, password, PhoneNumber, status, role) VALUES (?,?, ?, ?, ?)',
      [
        email,
        hashedPassword,
        phoneNumber,
        statusEnum.ACTIVE,
        roleEnum.MUSICIAN,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        console.log(result);
        if (!result.affectedRows) {
          return res.status(500).json({ error: 'User registration failed.' });
        }

        // insert into musician table
        pool.query(
          'INSERT INTO musician (Email,URL, YearsOfExperience, Description, BirthDate, BandName, Photo, FirstName, LastName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            email,
            url,
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
};

const login = (req, res) => {
  pool.query(
    'SELECT * FROM user WHERE email = ?',
    [req.body.email],
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
      try {
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          user.Password
        );
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid email or password.' });
        }
        console.log('USER ID:', user.UserId);
        //assign TOKEN
        const token = jwt.sign({ id: user.UserId }, 'secretKey');
        //add to cookies
        const { password, ...others } = user;
        res
          .cookie('accessToken', token, {
            httpOnly: true,
          })
          .status(200)
          .json(others);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error while comparing password.' });
      }
    }
  );
};

const logout = (req, res) => {
  res
    .clearCookie('accessToken', { secure: true, sameSite: 'none' })
    .status(200)
    .json('USER LOGGED OUT!');
};
module.exports = { register, login, logout };
