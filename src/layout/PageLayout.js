import React from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
const PageLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className=" h-screen flex px-5 py-24 mx-auto flex-col justify-center items-center ">
        {children}
      </main>

      <Footer />
    </>
  );
};
export default PageLayout;
