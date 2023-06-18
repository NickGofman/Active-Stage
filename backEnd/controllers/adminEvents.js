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

const getThreeEventsToAssign = (req, res) => {
  const q = `
    SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date
, COUNT(mre.UserId) AS RCount
    FROM event AS e
    JOIN musician_register_event AS mre ON e.EventID = mre.EventID
    JOIN musician AS m ON mre.UserId = m.UserId
    JOIN user AS u ON m.Email = u.Email
    AND u.Status = 'Active'
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
    SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date
, m.BandName AS BandName
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
  SELECT m.BandName, m.Description, m.YearsOfExperience, m.UserId
  FROM musician AS m
  JOIN musician_register_event AS mre ON m.UserId = mre.UserId
  JOIN event AS e ON mre.EventID = e.EventID
  JOIN user AS u ON m.UserId = u.UserId
  WHERE e.EventID = ? AND u.Status = 'Active'
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
    //TODO send mail to user, make a query for the mail by userId

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
    SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
 m.BandName AS BandName ,m.Photo,u.PhoneNumber
    FROM event AS e
    LEFT JOIN musician AS m ON e.UserId = m.UserId
    LEFT JOIN user AS u ON u.UserId = m.UserId
    WHERE e.Status = 'Assigned' AND e.Date > CURDATE()
    GROUP BY e.EventID, e.Date
    ORDER BY e.Date ASC
   
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
const getSortedEventDataByType = (req, res) => {
  const { sortType, endDate, startDate } = req.params;
  console.log('req.params', req.params);
  let query = '';
  let queryParams = [];
  //SELECT BandName,Count(),Date,status
  // FROM event WHERE Date >= ? AND Date <= ? order by Status
  switch (sortType) {
    case 'all':
      query = `
SELECT DISTINCT
  e.EventID,
  e.UserID,
  e.MusicalTypeID,
  CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
  e.Income,
  e.Description,
  e.Status,
  (
    SELECT COUNT(mre.UserId)
    FROM musician_register_event AS mre
    LEFT JOIN musician AS m ON mre.UserId = m.UserId
    LEFT JOIN user AS u ON u.UserId = m.UserId
    WHERE mre.EventID = e.EventID
    AND u.Status = 'Active'
  ) AS NumberOfRegisters,
  (
    SELECT m.BandName
    FROM musician_register_event AS mre
    LEFT JOIN musician AS m ON mre.UserId = m.UserId
    LEFT JOIN user AS u ON u.UserId = m.UserId
    WHERE mre.EventID = e.EventID
    AND u.Status = 'Active'
    LIMIT 1
  ) AS BandName
FROM
  event AS e
WHERE
  DATE(e.Date) >= DATE(?)
  AND DATE(e.Date) <= DATE(?)
  AND (
    e.Status = 'Closed'
    OR (e.Status = 'WithoutIncome' AND e.Income = 0)
    OR e.Status = 'Assigned'
    OR e.Status = 'Published'
  )
ORDER BY
  Status;
`;
      queryParams = [startDate, endDate];
      break;
    case 'Closed':
      query = ` SELECT  e.EventID,
    e.MusicalTypeID,
    CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
    e.Income,
    e.Status,
    m.BandName
    FROM event AS e
    LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID  
    LEFT JOIN musician AS m ON mre.UserId = m.UserId 
    LEFT JOIN user AS u ON u.UserId = m.UserId 
    WHERE DATE(e.Date) >= DATE(?)
      AND DATE(e.Date) <= DATE(?)
      AND e.Status = ?
    GROUP BY e.EventID;`;
      queryParams = [startDate, endDate, 'Closed'];
      break;
    case 'WithoutIncome':
      query = ` SELECT e.EventID,
    e.UserID,
    e.MusicalTypeID,
    CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
    e.Income,
    e.Description,
    e.Status,
    m.BandName
FROM event AS e
LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID
LEFT JOIN musician AS m ON mre.UserId = m.UserId
LEFT JOIN user AS u ON u.UserId = m.UserId
       WHERE DATE(e.Date) < CURDATE() AND e.Status = ? AND e.Income = ?
  
GROUP BY e.EventID`;
      queryParams = ['Assigned', 0];
      break;
    case 'Assigned':
      query = ` SELECT e.EventID,
    e.UserID,
    e.MusicalTypeID,
    CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
    e.Income,
    e.Description,
    e.Status,
    COUNT(mre.UserId) AS NumberOfRegisters,
    m.BandName
FROM event AS e
LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID
LEFT JOIN musician AS m ON mre.UserId = m.UserId
LEFT JOIN user AS u ON u.UserId = m.UserId
WHERE DATE(e.Date) >= CURDATE() and DATE(e.Date) >= DATE(?) and DATE(e.Date) <= DATE(?)
  AND e.Status = ? AND u.Status = 'Active'
GROUP BY e.EventID`;
      queryParams = [startDate, endDate, 'Assigned'];
      break;
    case 'Published':
      query = `
     SELECT  e.EventID,
    e.UserID,
    e.MusicalTypeID,
    CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
    e.Income,
    e.Description,
    e.Status,
    COUNT(mre.UserId) AS NumberOfRegisters,
    m.BandName
FROM event AS e
LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID  
LEFT JOIN musician AS m ON mre.UserId = m.UserId 
LEFT JOIN user AS u ON u.UserId = m.UserId 
WHERE DATE(e.Date) >= DATE(?)
  AND DATE(e.Date) <= DATE(?)
  AND (u.Status = 'Active' OR u.Status IS NULL)
  AND e.Status = ?
GROUP BY e.EventID;
      `;
      queryParams = [startDate, endDate, 'Published'];
      break;
    default:
      return res.status(400).json({ error: 'Invalid sort type' });
  }

  pool.query(query, queryParams, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('datadata', data);
    return res.status(200).json(data);
  });
};
const cancelEvent = (req, res) => {
  const { eventId } = req.params;
  console.log('cancelEvent', eventId);
  // Update the event status to 'Canceled'
  const qCancelEvent = 'UPDATE event SET Status = ? WHERE EventID = ?';

  pool.query(qCancelEvent, ['Cancelled', eventId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'Failed to cancel the event.' });
    }

    return res.status(200).json({ message: 'Event canceled successfully.' });
  });
};
const updateEvent = (req, res) => {
  const { eventId } = req.params;
  const updatedEvent = req.body;

  // Extract the updated values from the request body
  const { description, dateTime, musicalTypeId } = updatedEvent;
  console.log('updateEvent eventId', eventId);
  console.log('updateEvent updatedEvent', updatedEvent);
  // Construct the update query
  const updateQuery = `
    UPDATE event
    SET Description = ?,
        Date = ?,
        MusicalTypeID = ?
    WHERE EventID = ?
  `;

  pool.query(
    updateQuery,
    [description, dateTime, musicalTypeId, eventId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(400).json({ error: 'Failed to update the event.' });
      }

      return res.status(200).json({ message: 'Event updated successfully.' });
    }
  );
};
const cancelPassedEvents = () => {
  const selectQuery = `UPDATE event SET status = 'Cancelled'  WHERE status = 'Published' AND event.Date < CURDATE()`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      console.error(`Error updating event:`, error);
      return;
    }

    console.log(`Updated events to 'Cancelled'.`);
  });
};

module.exports = {
  createEvent,
  getMusicalStyles,
  getEventsDate,
  //getAllAssignMusicians,
  getThreeEventsToAssign,
  getAllUsersPerEvent,
  assignMusicianToEventById,
  getEventsPassedWithoutIncome,
  addIncome,
  getUpcomingEvents,
  getSortedEventDataByType,
  cancelEvent,
  updateEvent,
  cancelPassedEvents,
};
