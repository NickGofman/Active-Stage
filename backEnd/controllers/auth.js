'use strict';
const bcrypt = require('bcrypt');
const pool = require('../database');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

require('dotenv').config();

//#region ================ REGISTER ======================

const register = async (req, res) => {
  const statusEnum = {
    ACTIVE: 'Active',
    BANNED: 'Banned',
  };

  const roleEnum = {
    BUSINESS: 'admin',
    MUSICIAN: 'user',
  };

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
  //check user EXIST
  pool.query(
    'SELECT * FROM user u LEFT JOIN musician m ON u.UserId = m.UserId WHERE u.Email = ? OR m.BandName = ?',
    [email, bandName],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      //check if email or bandName
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          const user = result[i];
          if (user.Email === email) {
            return res.status(400).json({ error: 'User already exists.' });
          } else if (user.BandName === bandName) {
            return res.status(400).json({ error: 'Band name already exists.' });
          }
        }
      }
      let BUSINESS = 'admin';
      let MUSICIAN = 'user';
      // insert into user table
      console.log(`HERE STATUS ${statusEnum.ACTIVE} ${roleEnum.MUSICIAN}`);
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
    }
  );
};

//#endregion

//#region  ================ LOGIN ======================

const login = (req, res) => {
  console.log('IN /auth/login BACKEND');

  pool.query(
    'SELECT * FROM user WHERE email = ?',
    [req.body.email],
    async (err, results) => {
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
        //add to cookies
        const { Password, ...others } = user;
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

//#endregion  ================ ENDlogin ======================

//#region ================ LOGOUT ======================

const logout = (req, res) => {
  res
    .clearCookie('accessToken', { secure: true, sameSite: 'none' })
    .status(200)
    .json('USER LOGGED OUT!');
};
//#endregion ================ LOGOUT ======================

//#region ================ FORGOT-PASSWORD ======================

const forgotPassword = async (req, res) => {
  // Generate new password
  let newPassword = generatePassword();
  // Hash password
  let hashedPassword = await bcrypt.hash(newPassword, 10);
  let userEmail = req.body;

  console.log('HASHPassword', hashedPassword, 'NEW PASSWORD:', newPassword);
  console.log('EMAILAAA:', userEmail);
  // Check if user exists
  pool.query(
    'SELECT * FROM user WHERE Email = ?',
    userEmail.email,
    (err, result) => {
      console.log('IN pool.query(SELECT * FROM user WHERE Email = ?');
      console.log('EMAILAAA234234:', userEmail);
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log('RESULT: ', result);
      if (result.length === 0) {
        return res.status(400).json({ error: 'User does not exist.' });
      }

      // Update user password in the database
      pool.query(
        'UPDATE user SET Password = ? WHERE Email = ?',
        [hashedPassword, userEmail.email],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          console.log('RESULT: ', result);
          let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: userEmail.email,
            subject: 'Sending Email using Node.js',
            html: `<h1>Hello ${userEmail.email} </h1> <p>you new password is ${newPassword}</p>`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);

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
    }
  );
};
//#endregion ================ Forgot Password ======================

//#region ================ CHANGE-PASSWORD======================

const changePassword = async(req, res) => {
  const token = req.cookies.accessToken;
  const password = req.body.newPassword;
  //hash new password
  console.log('hash new password');
  let hashedPassword = await bcrypt.hash(password, 10);
    console.log('AFTER hash new password');

  //check token
  if (!token) return res.status(401).json('Not logged in!');
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    console.log(userInfo);
    const q = 'UPDATE user SET Password = ? WHERE UserId=?';
    const values = [hashedPassword, userInfo.id];
    pool.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('user password changed successfully');
    });
  });
};

// const changePassword = async (req, res) => {
//   const token = req.cookies.accessToken;
//   const password = req.body.password;

//   try {
//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Check token
//     if (!token) {
//       return res.status(401).json('Not logged in!');
//     }

//     jwt.verify(token, 'secretKey', (err, userInfo) => {
//       if (err) {
//         return res.status(403).json('Token is not valid!');
//       }

//       console.log(userInfo);

//       const q = 'UPDATE user SET Password = ? WHERE UserId = ?';
//       const values = [hashedPassword, userInfo.id];

//       pool.query(q, values, (err, data) => {
//         if (err) {
//           return res.status(500).json(err);
//         }

//         return res.status(200).json('User password changed successfully');
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json('Internal Server Error');
//   }
// };
//#endregion ================ CHANGE-PASSWORD======================

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
