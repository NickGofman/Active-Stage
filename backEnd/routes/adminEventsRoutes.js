'use strict';
const express = require('express');
const router = express.Router();
const pool = require('../database');
const eventStatusEnum = {
  OPEN: 'open',
  ASSING: 'assing',
  CLOSED: 'closed',
};

//#region ================ ALL-EVENT PAGE ======================

//#region ================ RADIO BUTTON ======================
//Get all events:
router.get('/events', (req, res) => {
  pool.query('SELECT * FROM event', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ events: results });
  });
});
//Get events by date range
router.get('/events/date-range', (req, res) => {
  //get date range from front
  const { startDate, endDate } = req.query;
  pool.query(
    'SELECT * FROM event WHERE Date BETWEEN ? AND ?',
    [startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});
//Get all events with specific status open and within date range
router.get('/events/open', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `SELECT * FROM event WHERE Status = ? AND Date BETWEEN ? AND ?`;

  pool.query(
    query,
    [eventStatusEnum.OPEN, startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});

//Get all events with specific status closed and within date range
router.get('/events/closed', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `SELECT * FROM event WHERE Status = ? AND Date BETWEEN ? AND ?`;

  pool.query(
    query,
    [eventStatusEnum.CLOSED, startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});

//Get all events with status assign and within date range
router.get('/events/assign', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `SELECT * FROM event WHERE Status = ? AND Date BETWEEN ? AND ?`;

  pool.query(
    query,
    [eventStatusEnum.ASSIGN, startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});

//get all events that need to add income and within date range
router.get('/events/assign/past', (req, res) => {
  const { startDate, endDate } = req.query;
  const query = `SELECT * FROM event WHERE Status = 'assign' AND Date < ? AND Date BETWEEN ? AND ?`;

  pool.query(query, [new Date(), startDate, endDate], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ events: results });
  });
});

//#endregion
//Get all musicians info that registered to specific event:

//#region ================ ASSIGN MUSICIAN LIST ======================
router.get('/events/:eventId/musicians', (req, res) => {
  //get eventId
  const eventId = req.params.eventId;
  pool.query(
    'SELECT musician.* FROM musician_register_event JOIN musician ON musician.Email = musician_register_event.Email WHERE musician_register_event.EventID = ?',
    [eventId],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ musicians: results });
    }
  );
});
//#endregion

//#endregion

//#region ================ REPORTS PAGE ======================
//get all events sorted by income within a date range
router.get('/events/sorted-by-income', (req, res) => {
  const { startDate, endDate } = req.query;
  pool.query(
    'SELECT event.Date, musician.BandName, event.Income FROM event INNER JOIN musician ON event.UserID = musician.UserId WHERE event.Date BETWEEN ? AND ? ORDER BY event.Income DESC',
    [startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});
//get all events sorted by band name within a date range
router.get('/events/sorted-by-band-name', (req, res) => {
  const { startDate, endDate } = req.query;
  pool.query(
    'SELECT event.Date, musician.BandName, event.Income FROM event INNER JOIN musician ON event.UserID = musician.UserId WHERE event.Date BETWEEN ? AND ? ORDER BY musician.BandName ASC',
    [startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});

//get all events sorted by musical type within a date range
router.get('/events/sorted-by-musical-type', (req, res) => {
  const { startDate, endDate } = req.query;
  pool.query(
    'SELECT event.Date, musician.BandName, event.Income, typesdescription.MusicalTypeName FROM event INNER JOIN musician ON event.UserID = musician.UserId INNER JOIN typesdescription ON event.MusicanlTypeID = typesdescription.MusicalTypeID WHERE event.Date BETWEEN ? AND ? ORDER BY typesdescription.MusicalTypeName ASC',
    [startDate, endDate],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({ events: results });
    }
  );
});
//#endregion
