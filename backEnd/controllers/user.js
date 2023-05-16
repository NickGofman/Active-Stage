'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');
//#region ================updateProfile================
const updateProfile = (req, res) => {
  const token = req.cookies.accessToken;
  console.log('CONTROLLERS BACKEND updateProfile');
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
module.exports = { updateProfile };
