import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageLayout from './layout/PageLayout';
import MusicianHomePage from './pages/MusicianHomePage';
import MusicianMyEventsPage from './pages/MusicianMyEventsPage';
import MusicianProfilePage from './pages/MusicianProfilePage';
import { ThemeProvider } from '@material-tailwind/react';

function App() {
  return (
    <ThemeProvider>
      <main className="h-screen">
        <PageLayout>
          {/* <LoginPage /> */}
          {/* <RegisterPage/> */}
          {/* <MusicianHomePage /> */}
          {/* <MusicianMyEventsPage /> */}
          <MusicianProfilePage/>
        </PageLayout>
      </main>
    </ThemeProvider>
  );
}

export default App;
