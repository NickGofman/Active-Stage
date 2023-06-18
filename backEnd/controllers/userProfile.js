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
  const q = `SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date
, e.Description, td.MusicalTypeName FROM event AS e JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID WHERE e.Status = 'Published' AND e.EventID NOT IN ( SELECT EventID FROM musician_register_event WHERE UserId = ? ) ORDER BY e.Date;`;
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

  const q = `SELECT e.EventID, CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date, e.Description, td.MusicalTypeName
FROM event AS e
JOIN musician_register_event AS mre ON e.EventID = mre.EventID
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE e.UserID = ? AND e.Status <> 'Cancelled'

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

  const q = `SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date, e.Description, td.MusicalTypeName
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

const unregisterToEvent = (req, res) => {
    const userId = req.params.userId;
    const eventId = req.params.eventId;

  console.log('IN BACKEND unregisterToEvent', userId);
  
  console.log('IN BACKEND unregisterToEvent', eventId);
  
  


  const q = `DELETE FROM musician_register_event WHERE EventID = ? AND UserID = ?`;

  pool.query(q, [eventId, userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

module.exports = {
  updateProfile,
  getProfile,
  getPublishedEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,
  
  unregisterToEvent,
};
