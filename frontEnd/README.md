## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

Node.js and npm: The project requires Node.js and npm (Node Package Manager) to be installed on your machine. You can download the latest version of Node.js from the official website (https://nodejs.org) and npm will be installed automatically along with Node.js.

### Installation

To get started with the project, follow these steps:

1. Clone this repository to your local machine:

git clone https://github.com/NickGofman/Active-Stage.git

2. Change into the project directory:
   cd frontend

3.Install the project dependencies, including Tailwind CSS:
npm install

important:
Tailwind CSS
To get started with Tailwind CSS, you can visit the official website https://tailwindcss.com/. The Tailwind CSS documentation provides in-depth information on how to use Tailwind CSS to style your components. You'll learn about utility classes, customizing styles, and creating responsive designs using Tailwind CSS.

Material Tailwind Components Documentation
For most of the components used in the project, you can find detailed documentation at https://www.material-tailwind.com/. This documentation will help you understand how to use and customize the Material Tailwind components in your application. You'll find examples, code snippets, and guidelines to make the most out of Material Tailwind's UI components.

React Query
For data fetching and state management in your React application, you can use React Query. The official website for React Query is https://tanstack.com/query/v3/. There, you'll find comprehensive documentation, guides, and examples to help you integrate React Query into your project. It will empower you to fetch, cache, and update data seamlessly, enhancing the performance and user experience of your application.

4. Running the Development Server
   To run the development server, use the following command:
   npm start

Technologies Used
The project is built using several technologies and libraries, including:

React: The frontend is developed using React, a popular JavaScript library for building user interfaces.
Tailwind CSS: Tailwind CSS is used for styling the components. It provides a utility-first approach to CSS, making it highly customizable and responsive.
React Query: For data fetching and state management, the application relies on React Query. This library simplifies data management by handling caching, background data updates, and more.
React Router: To manage client-side routing, the frontend utilizes React Router. Different routes are defined for various pages, ensuring a smooth navigation experience for users.
axios: Axios is a widely-used library for making HTTP requests to the server, enabling smooth communication between the frontend and backend.
date-fns: The date-fns library is employed for handling date and time manipulation, offering a range of utilities to work with dates effectively.
Pages and Functionality
The frontend consists of various pages, each serving a distinct purpose:

LoginPage: Allows users to log in and access their accounts.
RegisterPage: Permits users to create a new account on the platform.
ProfilePage: Displays user profile information, enabling users to view and edit their profiles.
MusicianMyEventsPage: Shows events assigned specifically to musicians, allowing them to manage their schedule.
BusinessAllEvents: Provides businesses with an overview of all events, enabling them to manage their event calendar efficiently.
BusinessHomePage: Serves as the home page for business users, providing an overview of their account and relevant information.
BusinessReportPage: Allows businesses to generate reports, helping them analyze event data effectively.
MusicianHomePage: The homepage for musicians, showing personalized content and important updates.
Page404: The 404 error page is displayed when a route is not found, ensuring a user-friendly experience for incorrect URLs.
Authentication and Dark Mode
The frontend incorporates authentication features using the AuthContext to manage user authentication. The currentUser object stores information about the authenticated user, including their role, such as "admin" or "user."

Additionally, the application offers a Dark Mode feature through the DarkModeContext. The darkMode variable can be toggled to switch between light and dark themes, enhancing user experience and accessibility.

Styling and Forms
The frontend is styled using Tailwind CSS, which provides a wide range of utility classes to quickly build responsive UI components. These classes are applied directly within the components to style them efficiently.

Forms play a crucial role in user interactions. For instance, the MusicianProfileForm component is a form that musicians can use to edit their profiles. It allows them to update their personal information, such as their name, phone number, experience, and more.

State Management
For state management and data fetching, the application leverages React Query. The queryClient manages the cache for API data and is wrapped around the entire application using QueryClientProvider. This setup facilitates efficient data handling, ensuring a seamless user experience.

Calendar
To display a calendar view of events, the frontend uses the Calendar component. It utilizes date-fns for handling dates and events filtering, making it easy to navigate and visualize events based on their dates.
