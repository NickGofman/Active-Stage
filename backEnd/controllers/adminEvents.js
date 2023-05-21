'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');

const createEvent = (req, res) => {
  const { description, dateTime, musicalTypeId } = req.body;
  console.log('BACKEND:', description, dateTime);

  // Extract the date component from the dateTime
  const date = dateTime.split(' ')[0];

  // Check if event already exists on the specified date
  const qCheckIfExist = 'SELECT * FROM event WHERE Date LIKE ?';
  pool.query(qCheckIfExist, [`${date}%`], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.length > 0) {
      // Event already exists
      return res
        .status(409)
        .json({ error: 'Event already exists on the specified date.' });
    }

    // Event does not exist, create a new event
    const qCreateNewEvent = `
      INSERT INTO event (Description, Date, MusicalTypeID)
      VALUES (?, ?, ?)
    `;

    pool.query(
      qCreateNewEvent,
      [description, dateTime, musicalTypeId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        console.log('RESULT: ', result);

        if (result.affectedRows === 0) {
          return res
            .status(400)
            .json({ error: 'Failed to create a new event.' });
        }

        return res.status(200).json({ message: 'New Event Created.' });
      }
    );
  });
};
const getMusicalStyles = (req, res) => {
  const q = 'Select * FROM typesdescription';
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
};

module.exports = {
  createEvent,
  getMusicalStyles,
};
