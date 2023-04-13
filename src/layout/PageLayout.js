import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
const PageLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen ">
      <Header />

      <main className=" flex flex-grow px-5 py-24 mx-auto flex-col justify-center items-center ">
        {children}
      </main>

      <Footer />
    </div>
  );
};
export default PageLayout;
