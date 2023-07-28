import React, { useContext } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext'; // Update the path to your DarkModeContext file

const PageLayout = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
   
      <div className="flex flex-col h-screen">
        <Header darkMode={darkMode} />
        <main className="flex-1 dark:bg-black dark:text-white">
          <Outlet darkMode={darkMode} />
        </main>
        <Footer darkMode={darkMode} />
      </div>
   
  );
};

export default PageLayout;
