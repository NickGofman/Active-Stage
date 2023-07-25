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
  console.log(
    ' IN /auth/register BACKEND HERE STATUS',
    statusEnum.ACTIVE,
    roleEnum.MUSICIAN
  );
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
            sendWelcomeEmail(email);
            res
              .status(200)
              .json({ message: 'Musician registered successfully.' });
          }
        );
      }
    );
  });
};
const sendWelcomeEmail = (userEmail) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: 'Welcome to our platform',
    html: `
      <h1>Welcome to our platform</h1>
      <p>Thank you for registering as a musician. We are excited to have you on board!</p>
      <p>Have a great day!</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(`Failed to send welcome email to ${userEmail}:`, error);
    } else {
      console.log(`Welcome email sent to ${userEmail}: ${info.response}`);
    }
  });
};
//#endregion

//#region  ================ LOGIN ======================

const login = (req, res) => {
  console.log('IN /auth/login BACKEND');
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
          to: userEmail, // Corrected to userEmail
          subject: 'Your new Password',
          html: `<h1>Hello ${userEmail} </h1>
          <p>your new password is:</p>
          <2> ${newPassword}</2>
          `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(`Failed to send email to ${userEmail}:`, error);
            // Although an error occurred sending the email, continue and return a response to the client
          } else {
            console.log(`Email sent to ${userEmail}: ${info.response}`);
          }
          // Only one response should be sent after the query execution and the email sending are complete
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

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  changePassword,
};
