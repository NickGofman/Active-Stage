import React from 'react';
import NavBar from '../navBar/NavBar';
import { Typography } from '@material-tailwind/react';

export default function Header() {
  const name = 'saar';
  return (
    <header className="flex mt-4 mr-4 justify-end ">
      <NavBar />
    </header>
  );
}
