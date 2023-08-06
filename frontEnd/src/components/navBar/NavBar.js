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
import MainLogoDark from '../../logo/NJs0uK01Dark1.svg';

import { AuthContext } from '../../components/context/authContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../DarkModeContext';
import SwitchDarkMode from '../switchDarkModeButton/SwitchDarkMode';
export default function NavBar() {
  // Access the DarkModeContext to get the current darkMode state
  const { darkMode } = useContext(DarkModeContext);

  // State to control whether the mobile navigation is open or closed
  const [openNav, setOpenNav] = useState(false);

  // Access the AuthContext to get user information and logout function
  const { logout, currentUser } = useContext(AuthContext);

  // Hook to manage navigation using react-router-dom
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    await logout();
  };

  // Function to navigate to the user's home page
  const handleNavigateToHome = () => {
    navigate(`/${currentUser.Role}`);
  };

  //Function to navigate to the user's profile page
  const handleNavigateToProfile=()=>{
    navigate(`/${currentUser.Role}/profile/${currentUser.UserId}`);
  }

  useEffect(() => {
    // Add event listener for resizing window to close the mobile navigation on larger screens
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () => {
      // Cleanup function to remove the event listener when the component unmounts
      window.removeEventListener(
        'resize',
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    };
  }, []);

  // JSX for the navigation links based on the user role
  let navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 hover:cursor-pointer">
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
          onClick={handleNavigateToProfile}
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
          to={currentUser.Role === 'admin' ? '/admin/events' : '/user/myEvents'}
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
    </ul>
  );
  // NAV BAR
  return (
    <Navbar className="h-max max-w-full rounded-md py-2 px-4 lg:px-8 lg:py-4 dark:bg-black dark:text-white">
      <div className="absolute top-1 left-1">
        <SwitchDarkMode />
      </div>

      <div className="flex items-center justify-between relative">
        <div className="hidden lg:flex lg:flex-col lg:gap-1 ">{navList}</div>
        {/* Toggle icon for mobile navigation */}
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
        {/*  Logo */}
        <div className="flex flex-row dark:bg-none">
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
            className="w-[150px] h-[100px] hover:cursor-pointer  dark:rounded-full "
            onClick={handleNavigateToHome}
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}
