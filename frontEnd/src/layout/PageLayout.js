import React, { useContext } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext';

const PageLayout = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Header darkMode={darkMode} />
      <main className="flex-1 dark:bg-black dark:text-white">
        <div className="container mx-auto h-full">
          <Outlet darkMode={darkMode} />
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default PageLayout;
