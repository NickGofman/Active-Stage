'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');

const createEvent = (req, res) => {
  const data = req.body;

  const qCheckIfExist = 'SELECT * FROM event WHERE Date = ?';
  pool.query(qCheckIfExist, data.date, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data.length > 0) {
      return res.status(409).json('Event Already exist');
    }
    const qCreateNewEvent =
      'INSERT INTO typesdescription (MusicalTypeName)WHERE Date = ?';
  });
};

module.exports = {
  createEvent,
};
