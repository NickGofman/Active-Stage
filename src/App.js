import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageLayout from './layout/PageLayout';
import MusicianHomePage from './pages/MusicianHomePage';
import { ThemeProvider} from '@material-tailwind/react';

function App() {
  return (
    <ThemeProvider>
      <main className="h-screen">
        <PageLayout>
          {/* <LoginPage /> */}
          {/* <RegisterPage/> */}
          <MusicianHomePage />
        </PageLayout>
      </main>
    </ThemeProvider>
  );
}

export default App;
