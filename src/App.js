import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageLayout from './layout/PageLayout';
import MusicianHomePage from './pages/MusicianHomePage';
import MusicianMyEventsPage from './pages/MusicianMyEventsPage';
import MusicianProfilePage from './pages/MusicianProfilePage';
import ChangePassword from './pages/ChangePassword';
import { ThemeProvider } from '@material-tailwind/react';
import ForgetPassword from './pages/ForgetPassword';
import BusinessHomePage from './pages/BusinessHomePage';
import BusinessAllEvents from './pages/BusinessAllEvents';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider>
      <PageLayout>
        {/* <LoginPage /> */}
        {/* <RegisterPage /> */}
        {/* <MusicianHomePage /> */}
        {/* <MusicianMyEventsPage /> */}
        {/* <MusicianProfilePage /> */}
        {/* <ChangePassword /> */}
        {/* <ForgetPassword /> */}
        {/* <BusinessHomePage/> */}
        <BusinessAllEvents />
      </PageLayout>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
