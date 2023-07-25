'use strict';
const pool = require('../database');
const getBandNames = (req, res) => {
  console.log('BACK END getBandNames');
  const { startDate, endDate } = req.params;
  const query = `
    SELECT DISTINCT musician.BandName
    FROM musician
    JOIN musician_register_event ON musician.UserId = musician_register_event.UserId
    JOIN event ON musician_register_event.UserId = event.UserId
    
    WHERE event.Status = 'Closed'
    AND event.Date >= DATE(?)
    AND event.Date <= DATE(?);
  `;

  // Execute the query and retrieve the band names
  pool.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: 'An error occurred while fetching band names.' });
    }

    const bandNames = results.map((result) => result.BandName);
    return res.status(200).json({ bandNames });
  });
};

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

  if (musicalTypeId) {
    query += ' AND mt.MusicalTypeID = ?';
    queryParams.push(musicalTypeId);
  }

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


module.exports = {
  getBandNames,
  getFilteredReports,
};
