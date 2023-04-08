import React from 'react'
import Footer from '../components/footer/Footer';
import NavBar from '../components/navBar/NavBar';
const PageLayout = ({children }) => {
  return (
    <>
      <NavBar />
      <div className="container flex px-5 py-24 mx-auto flex-col justify-center">
        {children}
      </div>
      <Footer />
    </>
  );
};
export default PageLayout;
