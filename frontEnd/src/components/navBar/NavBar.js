import { useState, useEffect } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Avatar,
  Button,
} from '@material-tailwind/react';
import { BiHome } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsCalendar4Event } from 'react-icons/bs';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import MainLogo from '../../logo/NJs0uK01.svg';
import MainLogoDark from '../../logo/NJs0uK01Dark.svg';

import { AuthContext } from '../../components/context/authContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../DarkModeContext';
export default function NavBar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const [openNav, setOpenNav] = useState(false);
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
  };
  const handleNavigateToHome = () => {
    navigate(`/${currentUser.Role}`);
  };
  useEffect(() => {
    console.log('useEffect NAV');
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () => {
      window.removeEventListener(
        'resize',
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    };
  }, []);

  let navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {currentUser.Role === 'admin' || (
        <Avatar
          variant="circular"
          size="xl"
          alt="candice wu"
          className="border border-blue-500 p-0.5 hidden lg:block"
          src={
            currentUser.Photo
              ? `http://localhost:3001/${currentUser.Photo}`
              : `http://localhost:3001/ProfileImg.jpg`
          }
        />
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" p-1 font-bold dark:text-white"
      >
        <Link
          to={currentUser.Role === 'admin' ? '/admin' : '/user'}
          className="flex flex-row-reverse gap-1 items-center"
        >
          <BiHome />
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold dark:text-white"
      >
        <Link
          to={
            currentUser?.Role === 'admin'
              ? `/admin/profile/${currentUser.UserId}`
              : `/user/profile/${currentUser.UserId}`
          }
          className="flex flex-row-reverse gap-1 items-center"
        >
          <CgProfile />
          Profile
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold dark:text-white"
      >
        <Link
          to={currentUser.Role === 'admin' ? '/admin/events' : '/user/myevents'}
          className="flex flex-row-reverse gap-1 items-center"
        >
          <BsCalendar4Event />
          {currentUser.Role === 'admin' ? 'All Events' : 'My Events'}
        </Link>
      </Typography>
      {currentUser?.Role === 'admin' && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold dark:text-white"
        >
          <Link
            to="/admin/reports"
            className="flex flex-row-reverse gap-1 items-center"
          >
            <HiOutlineDocumentReport />
            Reports
          </Link>
        </Typography>
      )}
      <button onClick={toggleDarkMode} className="dark:text-white text-black">
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </ul>
  );

  return (
    <Navbar className="h-max max-w-full rounded-md py-2 px-4 lg:px-8 lg:py-4 dark:bg-black dark:text-white">
      <div className="flex items-center justify-between ">
        <div className="hidden lg:flex lg:flex-col lg:gap-1 ">{navList}</div>
        {/* toggle icons */}
        <IconButton
          variant="text"
          className="mr-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden  text-black dark:text-white "
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        <div className="flex flex-row dark:space-x-10 dark:bg-none">
          <Button
            onClick={handleLogout}
            variant="text"
            color="red"
            size="sm"
            className="text-sm m-0 p-0"
          >
            Logout
          </Button>
          <img
            src={darkMode ? MainLogoDark : MainLogo}
            alt="Active-Stage Logo"
            className="w-[150px] h-[100px] hover:cursor-pointer  dark:bg-white dark:rounded-full dark:w-[100px]"
            onClick={handleNavigateToHome}
          />
        </div>
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}
