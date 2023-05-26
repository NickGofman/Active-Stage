'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');
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

const getOpenEvents = (req, res) => {
  const userId = req.params.id;

  console.log('IN BACKEND getOpenEvents', req);
  const q = `SELECT e.EventID, e.Date, e.Description, td.MusicalTypeName
FROM event AS e
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE e.Status = 'Published'
AND e.EventID NOT IN (
  SELECT EventID
  FROM musician_register_event
  WHERE UserId = ?
);`;
  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

const registerToEvent = (req, res) => {
  const userId = req.params.id;

  console.log('IN BACKEND registerToEvent', req);
  const q = `SELECT e.EventID, e.Date, e.Description, td.MusicalTypeName
FROM event AS e
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE e.Status = 'Published'
AND e.EventID NOT IN (
  SELECT EventID
  FROM musician_register_event
  WHERE UserId = ?
);`;
  pool.query(q, userId, (err, data) => {
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
WHERE e.UserId = ?


  `;
  console.log('req.params', req.params);

  pool.query(q, userId, (err,data) => {
    if (err) return res.status(500).json(err);
    console.log('BACkEND getAssignedEvents');
    console.log('getAssignedEvents',data);
    return res.status(200).json(data);
  });
};
//TODO- make sure that the events are not assign only registered
const getRegisteredEvents = (req, res) => {
   const userId = req.params.id;

   const q = `SELECT e.EventID, e.Date, e.Description, td.MusicalTypeName
FROM event AS e
LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE mre.UserId IS NULL

`;
   console.log('req.params', req.params);

   pool.query(q, (err, data) => {
     if (err) return res.status(500).json(err);
     console.log('BACkEND getAssignedEvents');
     return res.status(200).json(data);
   });
};
module.exports = {
  updateProfile,
  getProfile,
  getOpenEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,
};
