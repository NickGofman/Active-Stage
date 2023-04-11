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

function App() {
  return (
    <ThemeProvider>
      <PageLayout>
        {/* <LoginPage />
        <RegisterPage />
        <MusicianHomePage />
        <MusicianMyEventsPage />
        <MusicianProfilePage />
        <ChangePassword /> */}
        <ForgetPassword />
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
