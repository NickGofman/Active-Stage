'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');

//#region ================UPDATE PROFILE================

/**
Updates the musician's profile information after verify his jwt.
@param {*} req - The request object containing the musician's profile data.
@param {*} res - The response object to send back the status of the update process.
*/
const updateProfile = (req, res) => {
  const token = req.cookies.accessToken;
  const {
    firstName,
    lastName,
    phone,
    experience,
    youtubeURL,
    file,
    description,
  } = req.body;

  if (!token) return res.status(401).json('Not logged in!');
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');
    const q =
      'UPDATE musician JOIN user ON musician.UserId = user.UserId SET musician.FirstName = ?, musician.LastName = ?, user.PhoneNumber = ?, musician.YearsOfExperience = ?, musician.URL = ?,musician.Photo = ?, musician.Description = ? WHERE musician.UserId = ?';

    const values = [
      firstName,
      lastName,
      phone,
      experience,
      youtubeURL,
      file,
      description,
      userInfo.id,
    ];
    pool.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Musician information updated successfully');
    });
  });

  //
};
//#endregion

//#region ================GET PROFILE================

/**
Retrieves the musician's profile information.
@param {*} req - The request object containing the musician's user ID.
@param {*} res - The response object to send back the musician's profile data.
*/
const getProfile = (req, res) => {
  const userId = req.params.id;

  const q =
    'SELECT m.FirstName,m.LastName,u.PhoneNumber,m.YearsOfExperience,m.URL,m.Photo,m.Description, m.Email,m.BandName FROM musician as m JOIN user as u ON m.UserId = u.UserId WHERE m.UserId = ?';
  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
//#endregion


module.exports = {
  updateProfile,
  getProfile,

};
