'use strict';
const bcrypt = require('bcrypt');
const pool = require('../database');
const jwt = require('jsonwebtoken');
const transporter = require('../nodeMailer.js');
const emailFunctions = require('../emailUtils/emailFunctions'); // Import the email functions

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

/**
Registers a new musician user with the provided information.
@param {*} req - The request object containing the musician's registration information.
@param {*} res - The response object to send back the registration status.
*/
const register = async (req, res) => {
  //get data from frontEND
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

    //check in the data base if email exist or band name
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
            // Send the welcome email to the musician
            emailFunctions.sendWelcomeEmail(email);
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

/**
Authenticates the musician user by comparing the provided email and password with the database records and assign jwt to the user.
@param {*} req - The request object containing the musician's email and password for authentication.
@param {*} res - The response object to send back the login status and user information if successful.
*/
const login = (req, res) => {
  const qLogin = `
    SELECT u.*, m.Photo
    FROM user u
    LEFT JOIN musician m ON u.UserId = m.UserId
    WHERE u.email = ?
  `;
  //check if user already exist
  pool.query(qLogin, [req.body.email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
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
      if (user.Status === statusEnum.BANNED) {
        return res.status(401).json({ error: 'User Banned' });
      }
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
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
      res.status(500).json({ error: 'Error while comparing password.' });
    }
  });
};

//#endregion  ================ ENDlogin ======================

//#region ================ LOGOUT ======================

/**
Logs out the musician user by clearing the access token cookie.
@param {*} req - The request object containing the musician's access token.
@param {*} res - The response object to send back the logout confirmation message.
*/
const logout = (req, res) => {
  //clear the website cookies
  res
    .clearCookie('accessToken', { secure: true, sameSite: 'none' })
    .status(200)
    .json('USER LOGGED OUT!');
};
//#endregion ================ LOGOUT ======================

//#region ================ FORGOT-PASSWORD ======================

/**
Sends a new random password to the musician's email and updates the password in the database.
@param {*} req - The request object containing the musician's email.
@param {*} res - The response object to send back the status of the password reset process.
*/
const forgotPassword = async (req, res) => {
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
          to: userEmail,
          subject: 'Your new Password',
          html: `<h1>Hello ${userEmail} </h1>
          <p>your new password is:</p>
          <p> ${newPassword}</p>
          `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(`Failed to send email to ${userEmail}:`, error);
          } else {
            console.log(`Email sent to ${userEmail}: ${info.response}`);
          }
          return res
            .status(200)
            .json({ message: 'New password sent to your email.' });
        });
      }
    );
  });
};

//#endregion ================ Forgot Password ======================

//#region ================ CHANGE-PASSWORD======================

/**
Changes the musician user's password and updates it in the database after verify the user's jwt.
@param {*} req - The request object containing the musician's new password and access token.
@param {*} res - The response object to send back the status of the password change process.
*/
const changePassword = async (req, res) => {
  const token = req.cookies.accessToken;
  const password = req.body.newPassword;

  //hash new password
  let hashedPassword = await bcrypt.hash(password, 10);
  //check token
  if (!token) return res.status(401).json('Not logged in!');
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const qChangePassword = 'UPDATE user SET Password = ? WHERE UserId=?';

    const values = [hashedPassword, userInfo.id];
    pool.query(qChangePassword, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('user password changed successfully');
    });
  });
};
//#endregion ================ CHANGE-PASSWORD======================

//helper function used to generate a random
//password for the musician registration process.
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

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  changePassword,
};
