'use strict';
const express = require('express');
const router = express.Router();
const pool = require('../database');
const eventStatusEnum = {
  OPEN: 'open',
  ASSING: 'assing',
  CLOSED: 'closed',
};
//All events the musician registered to
router.get('/musician/:id/events', (req, res) => {
  const musicianId = req.params.id;
  pool.query(
    'SELECT event.* FROM event INNER JOIN musician_register_event ON event.EventID = musician_register_event.EventID WHERE musician_register_event.UserID = ?',
    [musicianId],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});
//All events musician assigned to
router.get('/musician/:id/assigned-events', (req, res) => {
  const musicianId = req.params.id;
  pool.query(
    'SELECT * FROM event WHERE UserID = ?',
    [musicianId],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});

//All events that the musician can assign to (i.e. all events that are "open"):
router.get('/musician/:id/open-events', (req, res) => {
  const musicianId = req.params.id;
  pool.query(
    'SELECT * FROM event WHERE Status = ? AND UserID IS NULL',
    [eventStatusEnum.OPEN],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});
//get  all user info
router.get('/musicians', (req, res) => {
  pool.query(
    'SELECT musician.*, user.PhoneNumber FROM musician INNER JOIN user ON musician.UserId = user.UserId',
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ musicians: results });
    }
  );
});
