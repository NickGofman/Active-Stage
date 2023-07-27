'use strict';
const pool = require('../database');

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
  console.log('BACkEND getAssignedEvents');

  const q = `SELECT DISTINCT e.EventID, CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date, e.Description, td.MusicalTypeName
FROM event AS e
JOIN musician_register_event AS mre ON e.EventID = mre.EventID
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE e.UserID = ? AND e.Status = 'Assigned'

  `;

  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
const getRegisteredEvents = (req, res) => {
  console.log('BACkEND getAssignedEvents');

  const userId = req.params.id;

  const q = `SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date, e.Description, td.MusicalTypeName
FROM musician_register_event AS mre
JOIN event AS e ON mre.EventID = e.EventID
JOIN typesdescription AS td ON e.MusicalTypeID = td.MusicalTypeID
WHERE e.UserID IS NULL
AND mre.UserID = ? AND e.Status <> 'Cancelled'
ORDER BY e.Date
`;

  pool.query(q, userId, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const unregisterToEvent = (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;

  const q = `DELETE FROM musician_register_event WHERE EventID = ? AND UserID = ?`;

  pool.query(q, [eventId, userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
const getAllPreviousEvents = (req, res) => {
  const userId = req.params.userId;
  console.log('userId:', userId);

  // select date and musical type name
  const q = `SELECT e.EventID, e.Date, t.MusicalTypeName AS musicalTypeName 
             FROM event AS e
             INNER JOIN typesdescription AS t ON e.MusicalTypeID = t.MusicalTypeID
             WHERE e.UserID = ? AND e.Status = 'Closed'`;

  pool.query(q, [userId], (err, data) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error retrieving events' });
    }
    console.log('data:', data);

    return res.status(200).json(data);
  });
};
module.exports = {
  getPublishedEvents,
  registerToEvent,
  getAssignedEvents,
  getRegisteredEvents,
  getAllPreviousEvents,
  unregisterToEvent,
};
