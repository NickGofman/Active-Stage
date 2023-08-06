import React from 'react';
import NavBar from '../navBar/NavBar';
export default function Header() {
  return (
    <header className="dark:bg-black dark:text-white sticky z-10 inset-0 flex justify-center ">
      <NavBar />
    </header>
  );
}
