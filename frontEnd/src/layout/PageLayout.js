import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default PageLayout;
