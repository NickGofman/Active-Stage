'use strict';
const pool = require('../database');

const emailFunctions = require('../emailUtils/emailFunctions'); // Import the email functions

/**
Creates a new event with the provided description, date, and musical type ID.
Checks if an event already exists on the specified date.
@param {*} req - The request object containing the event details in the body.
@param {*} res - The response object to send back the result.
*/
const createEvent = (req, res) => {
  const { description, dateTime, musicalTypeId } = req.body;
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

/**
Retrieves all available musical styles from the database.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
const getMusicalStyles = (req, res) => {
  const q = 'Select * FROM typesdescription';
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

/**
Retrieves all event dates from the database.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
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

/**
Retrieves up to three events with their event ID, date, and the count of registered musicians for each event.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
const getThreeEventsToAssign = (req, res) => {
  const q = `
 SELECT e.EventID,Date
, COUNT(mre.UserId) AS RCount
    FROM event AS e
    JOIN musician_register_event AS mre ON e.EventID = mre.EventID
    JOIN musician AS m ON mre.UserId = m.UserId
    JOIN user AS u ON m.Email = u.Email
    AND u.Status = 'Active'
    WHERE e.Status = 'Published' 
    GROUP BY  e.EventID ,e.Date
	ORDER BY e.Date ASC
    LIMIT 3
  `;
  pool.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
};

/**
Retrieves up to three events with their event ID, date, and the band name for events that have passed their date, had no income, and were in 'Assigned' status.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
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
    return res.status(200).json(data);
  });
};

/**
Retrieves all musicians registered for a specific event, along with their information.
@param {*} req - The request object containing the event ID in the params.
@param {*} res - The response object to send back the result.
*/
const getAllUsersPerEvent = (req, res) => {
  const { EventID } = req.params;

  const q = `
  SELECT m.BandName, m.Description, m.YearsOfExperience, m.UserId,m.URL,u.PhoneNumber,m.Photo
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
    return res.status(200).json(data);
  });
};

/**
Assigns a musician to a specific event using their user ID and updates the event status to 'Assigned'.
Sends an email notification to the musician about the assignment.
@param {*} req - The request object containing the event ID and musician's user ID in the params.
@param {*} res - The response object to send back the result.
*/
const assignMusicianToEventById = (req, res) => {
  const { EventID, UserId } = req.params;
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

    // Retrieve the musician's email using their UserId
    const getEmailQuery = 'SELECT Email FROM musician WHERE UserId = ?';
    pool.query(getEmailQuery, [UserId], (getEmailError, emails) => {
      if (getEmailError) {
        return res.status(500).json({ error: getEmailError.message });
      }

      if (emails.length === 0) {
        return res.status(400).json({ error: 'Musician not found.' });
      }

      const userEmail = emails[0].Email;

      // Retrieve the event date using the EventID
      const getEventDateQuery = 'SELECT Date FROM event WHERE EventID = ?';
      pool.query(getEventDateQuery, [EventID], (getDateError, dates) => {
        if (getDateError) {
          return res.status(500).json({ error: getDateError.message });
        }

        if (dates.length === 0) {
          return res.status(400).json({ error: 'Event not found.' });
        }

        const eventDate = dates[0].Date;

        // Send an email to the musician with the event date
        emailFunctions.sendEmailWithAssignedEvent(userEmail, eventDate);

        return res.status(200).json({ message: 'Musician assigned to event.' });
      });
    });
  });
};

/**
Adds income to a specific event and updates the event status to 'Closed'.
@param {*} req - The request object containing the event ID in the params and the income in the body.
@param {*} res - The response object to send back the result.
*/
const addIncome = (req, res) => {
  const { EventID } = req.params;
  const { income } = req.body;
  console.log('addIncome: EventID-income => ', EventID, '-', income);
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

/**
Retrieves all events (Closed, Published, Assigned) with their event ID, date, band name, photo, phone number, and status for displaying on a calendar.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
const getEventsForCalendar = (req, res) => {
  const q = `
    SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
 m.BandName AS BandName ,m.Photo,u.PhoneNumber,e.Status
    FROM event AS e
    LEFT JOIN musician AS m ON e.UserId = m.UserId
    LEFT JOIN user AS u ON u.UserId = m.UserId
    WHERE  e.Status <>'Cancelled' 
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

/**
Retrieves up to three upcoming events (Assigned events in the future) with their event ID, date, band name, photo, phone number, and status.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
const getThreeUpcomingEvents = (req, res) => {
  const q = `
    SELECT e.EventID,CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
 m.BandName AS BandName ,m.Photo,u.PhoneNumber,e.Status
    FROM event AS e
    LEFT JOIN musician AS m ON e.UserId = m.UserId
    LEFT JOIN user AS u ON u.UserId = m.UserId
    WHERE e.Status = 'Assigned' and e.Date>=Current_Date()
    GROUP BY e.EventID, e.Date
    ORDER BY e.Date ASC
   limit 3
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

/**
Retrieves events based on the specified sorting type ('all', 'Closed', 'WithoutIncome', 'Assigned', or 'Published') and date range.
@param {*} req - The request object containing the sorting type, end date, and start date in the params.
@param {*} res - The response object to send back the result.
*/
const getSortedEventDataByType = (req, res) => {
  const { sortType, endDate, startDate } = req.params;
  console.log('getSortedEventDataByType');
  let query = '';
  let queryParams = [];
  switch (sortType) {
    case 'all':
      query = `
        SELECT
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
            AND mre.UserId = e.UserID
            LIMIT 1
          ) AS BandName
        FROM
          event AS e
        WHERE
          DATE(e.Date) >= DATE(?)
          AND DATE(e.Date) <= DATE(?)
          AND (
            e.Status = 'Closed'
            OR e.Status = 'Assigned'
            OR e.Status = 'Published'
          )
        ORDER BY e.Status, Date;
      `;
      queryParams = [startDate, endDate];
      break;
    case 'Closed':
      query = `
        SELECT
          e.EventID,
          e.MusicalTypeID,
          CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
          e.Income,
          e.Status,
          (
            SELECT m.BandName
            FROM musician_register_event AS mre
            LEFT JOIN musician AS m ON mre.UserId = m.UserId
            LEFT JOIN user AS u ON u.UserId = m.UserId
            WHERE mre.EventID = e.EventID
            AND mre.UserId = e.UserID  
            LIMIT 1
          ) AS BandName
        FROM event AS e
        LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID
        LEFT JOIN musician AS m ON mre.UserId = m.UserId
        LEFT JOIN user AS u ON u.UserId = m.UserId
        WHERE DATE(e.Date) >= DATE(?)
          AND DATE(e.Date) <= DATE(?)
          AND e.Status = ?
        GROUP BY e.EventID
        ORDER BY Date;
      `;
      queryParams = [startDate, endDate, 'Closed'];
      break;
    case 'WithoutIncome':
      query = `
        SELECT
          e.EventID,
          e.UserID,
          e.MusicalTypeID,
          CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
          e.Income,
          e.Description,
          e.Status,
          COUNT(mre.UserId) AS NumberOfRegisters,
          (
            SELECT m.BandName
            FROM musician_register_event AS mre
            LEFT JOIN musician AS m ON mre.UserId = m.UserId
            LEFT JOIN user AS u ON u.UserId = m.UserId
            WHERE mre.EventID = e.EventID
            AND u.Status = 'Active'
            AND mre.UserId = e.UserID
            LIMIT 1
          ) AS BandName
        FROM event AS e
        LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID
        LEFT JOIN musician AS m ON mre.UserId = m.UserId
        LEFT JOIN user AS u ON u.UserId = m.UserId
        WHERE DATE(e.Date) < CURDATE() AND e.Status = ? AND e.Income = ?
        GROUP BY e.EventID
        ORDER BY Date;
      `;
      queryParams = ['Assigned', 0];
      break;
    case 'Assigned':
      query = `
        SELECT
          e.EventID,
          e.UserID,
          e.MusicalTypeID,
          CONVERT_TZ(e.Date, '+00:00', '+03:00') as Date,
          e.Income,
          e.Description,
          e.Status,
          COUNT(mre.UserId) AS NumberOfRegisters,
          (
            SELECT m.BandName
            FROM musician_register_event AS mre
            LEFT JOIN musician AS m ON mre.UserId = m.UserId
            LEFT JOIN user AS u ON u.UserId = m.UserId
            WHERE mre.EventID = e.EventID
            AND u.Status = 'Active'
            AND mre.UserId = e.UserID  -- Update this line to match the UserId in the event
            LIMIT 1
          ) AS BandName
        FROM event AS e
        LEFT JOIN musician_register_event AS mre ON e.EventID = mre.EventID
        LEFT JOIN musician AS m ON mre.UserId = m.UserId
        LEFT JOIN user AS u ON u.UserId = m.UserId
        WHERE DATE(e.Date) >= CURDATE() AND DATE(e.Date) >= DATE(?)
        AND DATE(e.Date) <= DATE(?)
        AND e.Status = ? AND u.Status = 'Active'
        GROUP BY e.EventID
        ORDER BY Date;
      `;
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
    GROUP BY e.EventID
    ORDER BY Date;
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
    return res.status(200).json(data);
  });
};

/**
Updates the status of an event to 'Cancelled' in the database.
@param {number} eventId - The ID of the event to be cancelled.
@param {*} res - The response object to send back the result.
*/
const cancel = (eventId, res) => {
  const qCancelEvent = 'UPDATE event SET Status = ? WHERE EventID = ?';

  pool.query(qCancelEvent, ['Cancelled', eventId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'Failed to cancel the event.' });
    }
  });
};

/**
Cancels an event and sends cancellation emails to registered musicians if applicable.
@param {*} req - The request object containing the event ID and status in the params.
@param {*} res - The response object to send back the result.
*/
const cancelEvent = (req, res) => {
  const { eventId, status } = req.params;
  console.log('status', status);
  console.log('eventid', eventId);

  let getEmailQuery = '';
  // Retrieve the list of registered musicians' emails for the canceled event
  if (status === 'Published') {
    getEmailQuery = `SELECT mre.Email, e.date FROM musician_register_event as mre join event as e on e.EventId = mre.EventID and e.EventID = ?`;
  } else {
    getEmailQuery = `SELECT DISTINCT mre.Email,e.Date
    FROM musician_register_event as mre join event as e on mre.UserId=e.UserId
    WHERE e.EventId = ?`;
  }
  pool.query(getEmailQuery, [eventId], (err, emails) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (emails.length === 0) cancel(eventId, res);
    else {
      // Extract the list of emails from the result
      const userEmails = emails.map((row) => row.Email);
      const eventDate = emails.map((row) => row.Date);

      // Send emails to all the registered musicians about the event cancellation
      userEmails.forEach((userEmails) => {
        emailFunctions.sendEmailWithEventCancellation(userEmails, eventDate[0]);
      });
      cancel(eventId, res);
    }

    return res.status(200).json({ message: 'Event canceled successfully.' });
  });
};

/**
Updates an event with new information and sends change notification emails to registered musicians if applicable.
@param {*} req - The request object containing the event ID and status in the params, and the updated event details in the body.
@param {*} res - The response object to send back the result.
*/
const updateEvent = (req, res) => {
  const { eventId, status } = req.params;
  const updatedEvent = req.body;
  console.log('rrrr', req.body);
  let getEmail = '';
  console.log('sss', status);
  // Extract the updated values from the request body
  const { description, dateTime, musicalTypeId } = updatedEvent;
  if (status === 'Published') {
    getEmail = `SELECT Email FROM musician_register_event WHERE EventId = ?`;
  } else {
    getEmail = `SELECT DISTINCT Email 
    FROM musician_register_event as mre join event as e on mre.UserId=e.UserId
    WHERE e.EventId = ?`;
  }
  pool.query(getEmail, [eventId], (err, Emails) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (Emails.length === 0) {
      // If there are no registered musicians, we don't need to retrieve the old date and time
      // Continue with the event update
      updateEventInDatabase(eventId, description, dateTime, musicalTypeId, res);
    } else {
      // If there are registered musicians, retrieve the old date and time from the database
      const selectQuery = `SELECT  Date FROM event as e WHERE EventID = ?`;
      pool.query(selectQuery, [eventId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
          return res.status(400).json({ error: 'Event not found.' });
        }

        const oldDateTime = result[0].Date;

        // Extract the list of emails from the result
        const userEmails = Emails.map((row) => row.Email);

        // Send emails to all the users with the old and new date and time
        userEmails.forEach((userEmail) => {
          // Call the function to send an email with the event change details to the user
          emailFunctions.sendEmailWithEventChange(
            userEmail,
            dateTime,
            oldDateTime,
            res
          );
        });

        // Continue with the event update
        updateEventInDatabase(
          eventId,
          description,
          dateTime,
          musicalTypeId,
          res
        );
      });
    }
  });
};

/**
Updates the event details in the database based on the provided event ID.
@param {number} eventId - The ID of the event to be updated.
@param {string} description - The updated description of the event.
@param {string} dateTime - The updated date and time of the event.
@param {number} musicalTypeId - The updated musical type ID of the event.
@param {*} res - The response object to send back the result.
*/
const updateEventInDatabase = (
  eventId,
  description,
  dateTime,
  musicalTypeId,
  res
) => {
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

/**
Cancels events that have passed their date and were in 'Published' status.
@param {*} req - The request object.
@param {*} res - The response object to send back the result.
*/
const cancelPassedEvents = (req, res) => {
  const selectQuery = `UPDATE event SET status = 'Cancelled'  WHERE status = 'Published' AND event.Date < CURDATE()`;
  pool.query(selectQuery, (error, result) => {
    if (error) {
      console.error(`Error updating event:`, error);
      return;
    }
    if (result.affectedRows === 0) {
      return;
    }

    return res.status(200).json({ message: 'Event updated successfully.' });
  });
};

module.exports = {
  createEvent,
  getMusicalStyles,
  getEventsDate,
  getThreeEventsToAssign,
  getAllUsersPerEvent,
  assignMusicianToEventById,
  getEventsPassedWithoutIncome,
  addIncome,
  getEventsForCalendar,
  getThreeUpcomingEvents,
  getSortedEventDataByType,
  cancelEvent,
  updateEvent,
  cancelPassedEvents,
};
