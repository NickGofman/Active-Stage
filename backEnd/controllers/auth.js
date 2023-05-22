'use strict';
const bcrypt = require('bcrypt');
const pool = require('../database');
const jwt = require('jsonwebtoken');
const transporter = require('../nodeMailer.js');

require('dotenv').config();

const statusEnum = {
  ACTIVE: 'Active',
  BANNED: 'Banned',
};

const roleEnum = {
  BUSINESS: 'admin',
  MUSICIAN: 'user',
};

//#region ================ REGISTER ======================

const register = async (req, res) => {
  console.log('HERE STATUS', statusEnum.ACTIVE, roleEnum.MUSICIAN);
  //get data from frontEND
  console.log('IN /auth/register BACKEND');
  const {
    email,
    password,
    phoneNumber,
    yearsOfExperience,
    description,
    birthDate,
    bandName,
    firstName,
    lastName,
    url,
  } = req.body;

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const qCheckIFExist = `SELECT * FROM user u LEFT JOIN musician m ON u.UserId = m.UserId WHERE u.Email = ? OR m.BandName = ?`;
  //check user EXIST
  pool.query(qCheckIFExist, [email, bandName], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    //check if email or bandName
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const user = result[i];
        if (user.Email === email) {
          return res.status(409).json({ error: 'User already exists.' });
        } else if (user.BandName === bandName) {
          return res.status(409).json({ error: 'Band name already exists.' });
        }
      }
    }

    // insert into user table
    console.log(` STATUS: ${statusEnum.ACTIVE} ${roleEnum.MUSICIAN}`);
    pool.query(
      'INSERT INTO user (Email, Password, PhoneNumber, Status, Role) VALUES (?, ?, ?, ?, ?)',
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

        if (!result.affectedRows) {
          return res.status(500).json({ error: 'User registration failed.' });
        }
        const userId = result.insertId;

        // insert into musician table
        pool.query(
          'INSERT INTO musician (Email,URL, YearsOfExperience, Description, BirthDate, BandName, FirstName, LastName,UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)',
          [
            email,
            url,
            yearsOfExperience,
            description,
            birthDate,
            bandName,
            firstName,
            lastName,
            userId,
          ],
          (err) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res
              .status(200)
              .json({ message: 'Musician registered successfully.' });
          }
        );
      }
    );
  });
};

//#endregion

//#region  ================ LOGIN ======================

const login = (req, res) => {
  console.log('IN /auth/login BACKEND');
  const qLogin = `SELECT * FROM user WHERE email = ?`;
  //check if user already exist
  pool.query(qLogin, [req.body.email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(JSON.stringify(results));
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
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
      const { Password, ...others } = user;
      //add token to cookies
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
  });
};

//#endregion  ================ ENDlogin ======================

//#region ================ LOGOUT ======================

const logout = (req, res) => {
  console.log('IN /auth/logout BACKEND');

  res
    .clearCookie('accessToken', { secure: true, sameSite: 'none' })
    .status(200)
    .json('USER LOGGED OUT!');
};
//#endregion ================ LOGOUT ======================

//#region ================ FORGOT-PASSWORD ======================

const forgotPassword = async (req, res) => {
  console.log('IN /auth/forgotPassword BACKEND');

  // Generate new password
  let newPassword = generatePassword();
  // Hash password
  let hashedPassword = await bcrypt.hash(newPassword, 10);
  let userEmail = req.body.email;
  const qUserExists = `SELECT * FROM user WHERE Email = ?`;
  // Check if user exists
  pool.query(qUserExists, userEmail, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('RESULT: ', result);
    if (result.length === 0) {
      return res.status(400).json({ error: 'User does not exist.' });
    }
    const qUpdateUserPassword = `UPDATE user SET Password = ? WHERE Email = ?`;
    // Update user password in the database
    pool.query(
      qUpdateUserPassword,
      [hashedPassword, userEmail],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        //send email with new password to the user
        let mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: userEmail.email,
          subject: 'Your new Password',
          html: `<h1>Hello ${userEmail.email} </h1> <p>your new password is: ${newPassword}</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          console.log(`Email sent to ${email}: ${info.response}`);
          return res
            .status(200)
            .json({ message: 'New password sent to your email.' });
        });

        return res
          .status(200)
          .json({ message: 'New password sent to your email.' });
      }
    );
  });
};
//#endregion ================ Forgot Password ======================

//#region ================ CHANGE-PASSWORD======================
const changePassword = async (req, res) => {
  console.log('IN /auth/changePassword BACKEND');

  const token = req.cookies.accessToken;
  const password = req.body.newPassword;

  //hash new password
  let hashedPassword = await bcrypt.hash(password, 10);
  //check token
  if (!token) return res.status(401).json('Not logged in!');
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    console.log(userInfo);
    const qChangePassword = 'UPDATE user SET Password = ? WHERE UserId=?';

    const values = [hashedPassword, userInfo.id];
    pool.query(qChangePassword, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('user password changed successfully');
    });
  });
};
//#endregion ================ CHANGE-PASSWORD======================

//generate random new Password
function generatePassword() {
  const length = 12;
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; ++i) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

module.exports = { register, login, logout, forgotPassword, changePassword };
