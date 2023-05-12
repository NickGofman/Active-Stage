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
import { AuthContext } from '../../components/context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleLogout = () => {};
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  let navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" p-1 font-bold"
      >
        <Link
          to={currentUser.role === 'admin' ? '/admin' : '/user'}
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
        className="p-1 font-bold "
      >
        <Link
          to={
            currentUser?.role === 'admin'
              ? `/admin/profile/${currentUser.id}`
              : `/user/profile/${currentUser.id}`
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
        className="p-1 font-bold "
      >
        <Link
          to={currentUser.role === 'admin' ? '/admin/events' : '/user/myevents'}
          className="flex flex-row-reverse gap-1 items-center"
        >
          <BsCalendar4Event />
          {currentUser.role === 'admin' ? 'Events' : 'My Events'}
        </Link>
      </Typography>

      {currentUser?.role === 'admin' && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold "
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
      <Avatar
        variant="circular"
        size="lg"
        alt="candice wu"
        className="border border-blue-500 p-0.5 hidden lg:block"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
    </ul>
  );

  return (
    <Navbar className="h-max max-w-full rounded-md py-2 px-4 lg:px-8 lg:py-4 mb-10 ">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex flex-col ">
          <img
            src={MainLogo}
            alt="Active-Stage Logo"
            className="w-[150px] h-[100px]"
          />
          <Button
            onClick={handleLogout}
            variant="text"
            color="red"
            size="sm"
            className="text-sm"
          >
            Logout
          </Button>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:gap-1">{navList}</div>
        {/* toggle icons */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}
