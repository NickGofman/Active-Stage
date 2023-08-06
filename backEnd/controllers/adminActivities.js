'use strict';
const pool = require('../database');

/**
Blocks a user and unassigns their events.
@param {*} req - The request object containing the user's ID in the params.
@param {*} res - The response object to send back the result.
*/
const blockUserAndUnassignEvents = (req, res) => {
  const { userId } = req.params;

  const blockUserQuery = `UPDATE user SET Status = 'Banned' WHERE UserId = ?`;

  pool.query(blockUserQuery, [userId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // After blocking the user, update the assigned events
    const unassignEventsQuery = `
      UPDATE event
      SET UserId = NULL,
          Status = 'Published'
      WHERE UserId = ?
        AND (Status = 'Assigned' OR Status='Published')
        AND Date >= CURDATE()
    `;

    pool.query(unassignEventsQuery, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // If any assigned events were updated, inform the client
      const numUpdatedEvents = result.affectedRows;
      if (numUpdatedEvents > 0) {
        return res.status(200).json({
          message: `User banned.`,
        });
      } else {
        // If no events were updated, inform the client
        return res.status(200).json({ message: `User banned.` });
      }
    });
  });
};

/**
Adds a new musical style to the database.
@param {*} req - The request object containing the musical style name in the params.
@param {*} res - The response object to send back the result.
*/
const addNewMusicalStyle = (req, res) => {
  // Extract the new musical style data from the request body
  const { musicalStyleName } = req.params;

  const queryCheckName =
    'Select MusicalTypeName from typesdescription where MusicalTypeName=?';
  pool.query(queryCheckName, [musicalStyleName], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length > 0)
      return res
        .status(400)
        .json({ error: 'Musical style name already exist' });
    const query = `INSERT INTO typesdescription (MusicalTypeName) VALUES (?)`;
    // Execute the query with the provided musical style name as a parameter
    pool.query(query, [musicalStyleName], (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (result.affectedRows === 0) {
        return res
          .status(400)
          .json({ error: 'Failed to add the musical style.' });
      }

      // Return a success message upon successful insertion
      return res
        .status(200)
        .json({ message: 'Musical style added successfully.' });
    });
  });
};

module.exports = {
  blockUserAndUnassignEvents,
  addNewMusicalStyle,
};
