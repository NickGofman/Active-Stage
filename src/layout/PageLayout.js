import React from 'react'
import Footer from '../components/footer/Footer';
import NavBar from '../components/navBar/NavBar';
const PageLayout = ({children }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};
export default PageLayout;
