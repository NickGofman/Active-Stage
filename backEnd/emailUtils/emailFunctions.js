'use strict';
const transporter = require('../nodeMailer.js');

/**
Function to send an email to the musician with the assigned event date.
@param {string} userEmail - The email address of the musician.
@param {Date} eventDate - The date of the assigned event.
*/
const sendEmailWithAssignedEvent = (userEmail, eventDate) => {
  // Format the eventDate as needed (e.g., convert to a more readable format)
  const formattedEventDate = new Date(eventDate).toLocaleString('en-IL');

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

/**
Sends an email notification to users about the event cancellation.
@param {string} userEmail - The email address of the user.
@param {Date} eventDate - The date of the canceled event.
*/
const sendEmailWithEventCancellation = (userEmail, eventDate) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jerusalem',
  };

  const dateObject = new Date(eventDate);
  const date = dateObject.toLocaleTimeString('en-IL', options);

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

/**
Sends an email notification to users about the change in the event.
@param {string} userEmail - The email address of the user.
@param {Date} newDateTime - The new date and time of the event.
@param {Date} oldDateTime - The old date and time of the event.
@param {object} res - The response object to handle the result of sending the email.
*/
const sendEmailWithEventChange = (userEmail, newDateTime, oldDateTime, res) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jerusalem',
  };

  const oldDateObject = new Date(oldDateTime);
  const oldDate = oldDateObject.toLocaleTimeString('en-IL', options);
  const formattedNewDateTime = new Date(newDateTime).toLocaleString(
    'en-IL',
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

/**
Sends a welcome email to the user upon successful registration as a musician.
@param {string} userEmail - The email address of the musician.
*/
const sendWelcomeEmail = (userEmail) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: userEmail,
    subject: 'Welcome to our platform',
    html: `
      <h1>Welcome to our platform</h1>
      <p>Thank you for registering as a musician. We are excited to have you on board!</p>
      <p>Have a great day!</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(`Failed to send welcome email to ${userEmail}:`, error);
    } else {
      console.log(`Welcome email sent to ${userEmail}: ${info.response}`);
    }
  });
};

module.exports = {
  sendEmailWithAssignedEvent,
  sendEmailWithEventCancellation,
  sendEmailWithEventChange,
  sendWelcomeEmail,
};
