import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageLayout from './layout/PageLayout';
import MusicianHomePage from './pages/MusicianHomePage';
import MusicianMyEventsPage from './pages/MusicianMyEventsPage';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';
import { ThemeProvider } from '@material-tailwind/react';
import ForgetPassword from './pages/ForgetPassword';
import BusinessHomePage from './pages/BusinessHomePage';
import BusinessAllEvents from './pages/BusinessAllEvents';
import BusinessReportpage from './pages/BusinessReportpage';

function App() {
  return (
    <ThemeProvider>
      <PageLayout>
        {/* <LoginPage /> */}
        {/* <RegisterPage /> */}
        {/* <MusicianHomePage /> */}
        {/* <MusicianMyEventsPage /> */}
        {/* <ProfilePage /> */}
        {/* <ChangePassword /> */}
        {/* <ForgetPassword /> */}
        {/* <BusinessHomePage /> */}
        <BusinessAllEvents />
        {/* <BusinessReportpage/> */}
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
