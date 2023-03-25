import React from 'react';
import LoginPage from './pages/LoginPage';
import Footer from './components/footer/Footer';
import NavBar from './components/navBar/NavBar';

import DarkModeContext from './DarkModeContext';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div
        className={
          darkMode
            ? 'text-gray-400 bg-gray-900 body-font"'
            : 'bg-white text-gray-800'
        }
      >
        <header>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only"
              />
              <div className="block bg-gray-600 w-10 h-4 rounded-full"></div>
              <div
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } block absolute inset-y-0 left-0 w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300`}
              ></div>
            </div>
            <span className="ml-3 text-gray-700 dark:text-white font-medium">
              Dark Mode
            </span>
          </label>
          <NavBar />
        </header>
        <main className="h-screen">
          <LoginPage />
        </main>
        <Footer />
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;
