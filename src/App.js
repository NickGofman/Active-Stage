import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layout/PageLayout';

import { ThemeProvider} from '@material-tailwind/react';

function App() {
  return (
    
    <ThemeProvider>
      <main className="h-screen">
        <MainLayout>
          {/* <LoginPage /> */}
          <RegisterPage/>
        </MainLayout>
      </main>
    </ThemeProvider>
  );
}

export default App;
