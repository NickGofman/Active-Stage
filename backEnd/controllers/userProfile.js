'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
//#region ================UPDATE PROFILE================

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

//#region ================GET PROFILE================

const getProfile = (req, res) => {
  const userId = req.params.id;

  console.log('IN BACKEND getProfile');
  const q =
    'SELECT m.FirstName,m.LastName,u.PhoneNumber,m.YearsOfExperience,m.URL,m.Photo,m.Description, m.Email,m.BandName FROM musician as m JOIN user as u ON m.UserId = u.UserId WHERE m.UserId = ?';
  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log('IN BACKEND getProfile DATA:', data);
    return res.status(200).json(data);
  });
};
//#endregion

const getPublishedEvents = (req, res) => {
  const userId = req.params.id;
  const q = `SELECT e.EventID, e.Date, e.Description, td.MusicalTypeName FROM event AS e JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID WHERE e.Status = 'Published' AND e.EventID NOT IN ( SELECT EventID FROM musician_register_event WHERE UserId = ? ) ORDER BY e.Date;`;
  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

const registerToEvent = (req, res) => {
  const userId = req.params.id;
  const eventId = req.params.eventId;
  const userEmail = req.params.email;

  console.log('IN BACKEND registerToEvent', userId, eventId, userEmail);
  console.log('IN BACKEND registerToEvent', req.params);

  const q = `INSERT INTO musician_register_event (EventID, UserId, Email)
VALUES (?, ?, ?);
`;
  pool.query(q, [eventId, userId, userEmail], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

const getAssignedEvents = (req, res) => {
  const userId = req.params.id;

  const q = `SELECT e.EventID, e.Date, e.Description, td.MusicalTypeName
FROM event AS e
JOIN musician_register_event AS mre ON e.EventID = mre.EventID
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE mre.UserID = ? AND e.Status <> 'Cancelled'

  `;
  console.log('req.params', req.params);

  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log('BACkEND getAssignedEvents');
    console.log('getAssignedEvents', data);
    return res.status(200).json(data);
  });
};
//TODO- make sure that the events are not assign only registered
const getRegisteredEvents = (req, res) => {
  const userId = req.params.id;

  const q = `SELECT e.EventID, e.Date, e.Description, td.MusicalTypeName
FROM musician_register_event AS mre
JOIN event AS e ON mre.EventID = e.EventID
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE e.UserID IS NULL
  AND mre.UserID = ? AND e.Status <> 'Cancelled'

    ORDER BY e.Date

`;
  console.log('req.params', req.params);

  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    console.log('BACkEND getAssignedEvents');
    return res.status(200).json(data);
  });
};
const getUserPhoto = (req, res) => {
  const userId = req.params.id;

  // Query to retrieve the user's photo path from the database
  const q = `
    SELECT m.Photo
    FROM musician AS m
    JOIN user AS u ON m.UserId = u.UserId
    WHERE m.UserId = ?
  `;
  pool.query(q, userId, (err, result) => {
    if (err) {
      console.log('Error retrieving user photo:', err);
      return res.status(500).json(err);
    }

    // Check if a photo path exists for the user
    if (result.length === 0 || !result[0].Photo) {
      // Return the default photo file if the user's photo is null or doesn't exist
      const defaultPhotoFile = path.join(
        __dirname,
        '..',
        'UploadImages',
        'ProfileImg.jpg'
      );

      return res.sendFile(defaultPhotoFile);
    }

    const photoPath = result[0].Photo;
    const format = photoPath.split('.');
    console.log('format', format);
    // Read the user's photo file as a blob
    const photoFile = path.join('UploadImages', photoPath);
    fs.readFile(photoFile, (err, data) => {
      if (err) {
        console.log('Error reading user photo file:', err);
        return res.status(500).json(err);
      }
      if (format[1] === 'jpg') {
        res.setHeader('Content-Type', 'image/jpeg');
      }
      if (format[1] === 'png') {
        res.setHeader('Content-Type', 'image/png');
      }
      // Set the appropriate headers for the response
      res.setHeader('Content-Length', data.length);

      // Send the user's photo data as a blob in the response
      res.send(data);
    });
  });
};

module.exports = {
  updateProfile,
  getProfile,
  getPublishedEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,
  getUserPhoto,
};
