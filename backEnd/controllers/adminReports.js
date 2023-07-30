'use strict';
const pool = require('../database');

/**
Retrieves band names of musicians based on the provided start date, end date, and optional musical type.
@param {*} req - The request object containing the start date, end date, and optional musical type.
@param {*} res - The response object to send back the distinct band names of musicians.
*/
const getBandNames = (req, res) => {
  const { startDate, endDate, musicalTypeId } = req.body;
  let query = `
    SELECT DISTINCT musician.BandName
    FROM musician
    JOIN musician_register_event as mre ON musician.UserId = mre.UserId
    JOIN event ON mre.UserId = event.UserId
    
    WHERE event.Status = 'Closed'
    AND event.Date >= DATE(?)
    AND event.Date <= DATE(?)
  `;
  const queryParams = [startDate, endDate];
  if (musicalTypeId) {
    query += ' AND event.MusicalTypeID = ?';
    queryParams.push(musicalTypeId);
  }

  // Execute the query and retrieve the band names
  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching band names.' });
    }

    const bandNames = results.map((result) => result.BandName);
    return res.status(200).json(bandNames);
  });
};

/**
Retrieves filtered reports of closed events based on the provided start date, end date, musical type, and band name.
@param {*} req - The request object containing the start date, end date, musical type ID, and band name for filtering the reports.
@param {*} res - The response object to send back the filtered reports.
*/
const getFilteredReports = (req, res) => {
  const { startDate, endDate, musicalTypeId, bandName } = req.body;
  console.log('BACKEND getFilteredReports');
  let query = `
    SELECT 
      e.EventID,
      mt.MusicalTypeName,
      DATE_FORMAT(e.Date, '%d - %m - %Y') AS Date,
      e.Income,
      e.Status,
      m.BandName
    FROM
      event AS e
    LEFT JOIN musician AS m ON e.UserId = m.UserId
    LEFT JOIN typesdescription AS mt ON e.MusicalTypeID = mt.MusicalTypeID
    WHERE
      DATE(e.Date) >= DATE(?)
      AND DATE(e.Date) <= DATE(?)
      AND e.Status = 'Closed'
      AND e.Income > 0
      AND e.UserId IS NOT NULL
  `;

  const queryParams = [startDate, endDate];

  //check if musicalTypeId is given
  if (musicalTypeId) {
    query += ' AND mt.MusicalTypeID = ?';
    queryParams.push(musicalTypeId);
  }
  //check if band name is given
  if (bandName) {
    query += ' AND m.BandName = ?';
    queryParams.push(bandName);
  }

  query += ' GROUP BY e.EventID ORDER BY e.Date ASC';
  pool.query(query, queryParams, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

/**
Retrieves musical styles based on the provided start date, end date, and optional band name.
@param {*} req - The request object containing the start date, end date, and optional band name for filtering the musical styles.
@param {*} res - The response object to send back the distinct musical styles with their IDs.
*/
const getMusicalStylesByDate = (req, res) => {
  const { startDate, endDate, bandName } = req.body;
  let query = `
SELECT DISTINCT typesdescription.MusicalTypeID, typesdescription.MusicalTypeName
FROM musician
JOIN musician_register_event ON musician.UserId = musician_register_event.UserId
JOIN event ON musician_register_event.UserId = event.UserId
JOIN typesdescription ON event.MusicalTypeID = typesdescription.MusicalTypeID
WHERE event.Status = 'Closed'
  AND event.Date >= DATE(?)
  AND event.Date <= DATE(?) 
  `;
  const queryParams = [startDate, endDate];
  if (bandName) {
    query += ' AND musician.BandName = ?';
    queryParams.push(bandName);
  }

  // Execute the query and retrieve the band names
  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching Musical Styles.' });
    }

    return res.status(200).json(results);
  });
};
module.exports = {
  getBandNames,
  getFilteredReports,
  getMusicalStylesByDate,
};
