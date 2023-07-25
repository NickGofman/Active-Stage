'use strict';
const transporter = require('../nodeMailer.js');

// Function to send an email to the musician with the assigned event date
const sendEmailWithAssignedEvent = (userEmail, eventDate) => {
  // Format the eventDate as needed (e.g., convert to a more readable format)
  const formattedEventDate = new Date(eventDate).toLocaleString('en-US');

  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: 'Assigned to Event',
    html: `
      <h1>Assigned to Event</h1>
      <p>Congratulations! You have been assigned to the event on ${formattedEventDate}.</p>
      <p>We look forward to seeing you at the event.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(`Failed to send assignment email to ${userEmail}:`, error);
    } else {
      console.log(`Assignment email sent to ${userEmail}: ${info.response}`);
    }
  });
};

// Function to send email notification to users about the event cancellation
const sendEmailWithEventCancellation = (userEmail, eventDate) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const dateObject = new Date(eventDate);
  const date = dateObject.toLocaleTimeString('en-US', options);
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: 'Event Cancellation',
    html: `
      <h1>Event Cancellation</h1>
      <p>We regret to inform you that the event at ${date} has been canceled.</p>
      <p>Thank you for your understanding, and we hope to see you at our future events.</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(
        `Failed to send cancellation email to ${userEmail}:`,
        error
      );
    } else {
      console.log(`Cancellation email sent to ${userEmail}: ${info.response}`);
    }
  });
};

// Function to send email notification to users about the event change
const sendEmailWithEventChange = (userEmail, newDateTime, oldDateTime, res) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const oldDateObject = new Date(oldDateTime);
  const oldDate = oldDateObject.toLocaleTimeString('en-US', options);
  const formattedNewDateTime = new Date(newDateTime).toLocaleString(
    'en-US',
    options
  );
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: 'Change in the Event',
    html: `
      <h1>Important Update From Eli's pub</h1>
      <p>The event you registered for has undergone a change.</p>
      <p><b>Old</b> date and time for the event were: ${oldDate}</p>
      <p>The <b>NEW</b> date and time for the event are: <span style="font-weight:bold;font-size:20px">${formattedNewDateTime}</span></p>
      <p>Thank you for your understanding, and we look forward to seeing you at the event!</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    console.log(`Email sent to ${userEmail}: ${info.response}`);
    // If the email is sent successfully, you can return a success message or any relevant response.
    return res
      .status(200)
      .json({ message: 'Email sent to users about the event change.' });
  });
};

module.exports = {
  sendEmailWithAssignedEvent,
  sendEmailWithEventCancellation,
  sendEmailWithEventChange,
};
