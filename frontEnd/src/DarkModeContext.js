// import React, { useState, useEffect, createContext } from 'react';

// const DarkModeContext = createContext({
//   darkMode: null,
//   toggleDarkMode: () => {},
// });

// const DarkModeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(null);

//   useEffect(() => {
//     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       setTheme('dark');
//     } else {
//       setTheme('light');
//     }
//   }, []);

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme]);

//   const toggleDarkMode = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <DarkModeContext.Provider
//       value={{ darkMode: theme === 'dark', toggleDarkMode }}
//     >
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// export { DarkModeContext, DarkModeProvider };
import React, { useState, useEffect, createContext } from 'react';

const DarkModeContext = createContext({
  darkMode: null,
  toggleDarkMode: () => {},
});

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{ darkMode: darkMode, toggleDarkMode: toggleDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
