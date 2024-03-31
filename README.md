# Atcive Stage - Event Management System

The Event Management System is a comprehensive web application designed to streamline event organization for both musicians and businesses. It offers a wide range of features including user authentication, profile management, event listing, and reporting functionalities.

## Backend Overview

The backend of the Event Management System is built with Node.js and Express.js, utilizing MySQL as the database management system. Here's an overview of the backend components:

- **Routes:**
  - `authRoutes.js`: Defines routes for user authentication functionalities such as registration, login, logout, and password management.
  - `userRoutes.js`: Contains routes for handling user-specific actions such as profile management.
  - `adminRoutes.js`: Defines routes for administrative tasks such as event management and reporting.

- **Controllers:**
  - `uploadController.js`: Controller responsible for handling image uploads.
  - `auth.js`: Controller for user authentication functionalities including registration, login, logout, password reset, and password change.

- **Database Management:**
  - `database.js`: Module that connects to the MySQL database and exports the connection pool for executing queries.

## Frontend Overview

The frontend of the Event Management System is developed using React.js. It provides a user-friendly interface for interacting with the application's features. Here's an overview of the frontend components:

- **Components:**
  - Various UI components such as calendars, cards, forms, headers, and pagination for enhanced user experience.

- **Hooks:**
  - Custom hooks for managing state and logic across components, such as `useAuth` for handling user authentication.

- **Layout:**
  - `PageLayout.js`: Layout component ensuring a consistent structure across different pages of the application.

- **Pages:**
  - Individual components representing different pages of the application, including login, registration, profile management, and homepages for musicians and businesses.

- **Context:**
  - `AuthContext.js`: Context provider for managing user authentication state and providing necessary context to components.

## Technologies Used

### Backend Technologies:

- Node.js
- Express.js
- MySQL
- Bcrypt for password hashing
- JSON Web Tokens (JWT) for user authentication
- Nodemailer for sending emails

### Frontend Technologies:

- React.js
- React Router for client-side routing
- Axios for making HTTP requests to the backend
- Tailwind CSS for styling components
- Date-fns for date manipulation
- XLSX for reading and writing Excel files

## Usage

To run the Event Management System locally, follow these steps:

1. Clone this repository.
2. Navigate to the `backEnd` directory and install backend dependencies by running `npm install`.
3. Navigate to the `frontEnd` directory and install frontend dependencies by running `npm install`.
4. Start the backend server by running `npm start` in the `backEnd` directory.
5. Start the frontend server by running `npm start` in the `frontEnd` directory.
6. Access the application by navigating to `http://localhost:3000` in your web browser.


## Database Structure

The Event Management System relies on MySQL as its primary database management system, comprising multiple tables to store vital information regarding users, events, and musical details. Here's a concise overview of the database structure:

- **User Table:** Stores fundamental user data such as email, user ID, role, and status.
- **Musician Table:** Contains additional details specific to musician users, including years of experience, band name, and profile photo.
- **Business Table:** Stores information pertinent to business users, including business name and address.
- **Event Table:** Houses event-related information like event ID, organizer's user ID, date, and description.
- **EventMusician Table:** Records details about participating musicians in events, including the songs performed.
- **TypesDescription Table:** Provides descriptions for different musical types, mapping each type ID to its corresponding name.
- **EventMusician_Register_Musician Table:** Tracks registrations of musicians for events, linking the event ID and musician's user ID.

This structured database layout facilitates efficient data storage and retrieval, enabling seamless management of users, events, and music-related information within the system.


## Authors
Nick Gofman, Saar Yanckovich


## Learn More

For more information on each plugin and library used in the Event Management System, refer to the official documentation and resources provided by their respective maintainers:

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React.js Documentation](https://reactjs.org/docs/getting-started.html)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Date-fns Documentation](https://date-fns.org/v2.24.0/docs/)
- [Nodemailer Documentation](https://nodemailer.com/about/)
