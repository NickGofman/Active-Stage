'use strict';
const pool = require('../database');
const jwt = require('jsonwebtoken');

const createEvent = (req, res) => {
  const { description, dateTime, musicalTypeId } = req.body;
  console.log('BACKEND:', req.body);

  // Extract the date component from the dateTime
  const date = dateTime.split(' ')[0];

  // Check if event already exists on the specified date
  //TODO-should we delete the date validation (we have disabled dates)
  const qCheckIfExist = 'SELECT * FROM event WHERE Date LIKE ?';
  pool.query(qCheckIfExist, [`${date}%`], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.length > 0) {
      // Event already exists
      return res
        .status(409)
        .json('Event already exists on the specified date.');
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
  console.log('BACKEND getMusicalStyles');
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};
const getEventsDate = (req, res) => {
  const q = `SELECT DATE_FORMAT(Date, '%Y-%m-%d') AS startDate FROM event`;
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('inEventDates');
    return res.status(200).json(data);
  });
};

const getAllAssignMusicians = (req, res) => {
  const q = `SELECT m.BandName, e.Date, mu.Photo
              FROM event AS e
              JOIN musician_register_event AS mre ON e.EventID = mre.EventID
              JOIN musician AS m ON mre.UserId = m.UserId
              JOIN user AS u ON m.Email = u.Email
              WHERE e.Status = 'active'`;
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('getAllAssignMusicians');
    return res.status(200).json(data);
  });
};
const getThreeUpcomingEvents = (req, res) => {
  const q = `
    SELECT e.EventID, e.Date, COUNT(mre.UserId) AS RCount
    FROM event AS e
    JOIN musician_register_event AS mre ON e.EventID = mre.EventID
    JOIN musician AS m ON mre.UserId = m.UserId
    JOIN user AS u ON m.Email = u.Email
    WHERE e.Status = 'Published'
    GROUP BY e.EventID, e.Date
    ORDER BY RCount DESC
    LIMIT 3
  `;
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('getAllAssignMusicians');
    return res.status(200).json(data);
  });
};
const getEventsPassedWithoutIncome = (req, res) => {
  const q = `
    SELECT e.EventID, e.Date, m.BandName AS BandName
FROM event AS e
LEFT JOIN musician AS m ON e.UserId = m.UserId
WHERE e.Status = 'Assigned' AND e.Date < CURDATE() AND e.Income = 0
GROUP BY e.EventID, e.Date
ORDER BY e.Date ASC
LIMIT 3;

  `;
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('getEventsWithoutIncome');
    return res.status(200).json(data);
  });
};

const getAllUsersPerEvent = (req, res) => {
  const { EventID } = req.params;
  console.log('EventID', EventID);

  const q = `
    SELECT m.BandName, m.Description, m.YearsOfExperience ,m.UserId
    FROM musician AS m
    JOIN musician_register_event AS mre ON m.UserId = mre.UserId
    JOIN event AS e ON mre.EventID = e.EventID
    WHERE e.EventID = ?
  `;

  pool.query(q, EventID, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('getAllUsersPerEvent');
    return res.status(200).json(data);
  });
};
const assignMusicianToEventById = (req, res) => {
  const { EventID, UserId } = req.params;
  console.log('Test:', EventID);
  const qAssignMusician = `
  UPDATE event AS e
  JOIN musician_register_event AS mre ON e.EventID = mre.EventID
  SET e.UserId = ?,
      e.Status = 'Assigned'
  WHERE e.EventID = ?;
`;

  pool.query(qAssignMusician, [UserId, EventID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ error: 'Failed to assign musician to event.' });
    }

    return res.status(200).json({ message: 'Musician assigned to event.' });
  });
};
const addIncome = (req, res) => {
  const { EventID } = req.params;
  const { income } = req.body;
  console.log(EventID, '-', income);
    const updateQuery = `UPDATE event SET Income = ?, Status = 'Closed' WHERE EventID = ?`;
  pool.query(updateQuery, [income, EventID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res
      .status(200)
      .json({ message: 'Income updated successfully. Event closed.' });
  });
};
const getUpcomingEvents = (req, res) => {
  const q = `
    SELECT e.EventID, e.Date, m.BandName AS BandName 
    FROM event AS e
    LEFT JOIN musician AS m ON e.UserId = m.UserId
    WHERE e.Status = 'Assigned' AND e.Date > CURDATE()
    GROUP BY e.EventID, e.Date
    ORDER BY e.Date ASC
    LIMIT 3
  `;

  // Execute the query to fetch upcoming events from the database
  pool.query(q, (err, result) => {
    if (err) {
      // Handle the error
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Send the result as the response
      res.json(result);
    }
  });
};


module.exports = {
  createEvent,
  getMusicalStyles,
  getEventsDate,
  getAllAssignMusicians,
  getThreeUpcomingEvents,
  getAllUsersPerEvent,
  assignMusicianToEventById,
  getEventsPassedWithoutIncome,
  addIncome,
  getUpcomingEvents,
};
