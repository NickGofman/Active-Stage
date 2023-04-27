// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   Typography,
// } from '@material-tailwind/react';
// import {
//   HomeIcon,
//   PowerIcon,
//   MusicalNoteIcon,
//   UserCircleIcon,
// } from '@heroicons/react/24/outline';

// import { Link } from 'react-router-dom';

// export default function NavBar() {
//   return (
//     <Menu>
//       <MenuHandler>
//         <Avatar
//           variant="circular"
//           alt="candice wu"
//           className="cursor-pointer"
//           src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
//         />
//       </MenuHandler>
//       <MenuList>

//         <MenuItem className="flex items-center gap-2">
//           <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
//           <Typography variant="small" className="font-normal">
//             My Profile
//           </Typography>
//         </MenuItem>
//         <MenuItem className="flex items-center gap-2">
//           <HomeIcon strokeWidth={2} className="h-4 w-4" />
//           <Typography variant="small" className="font-normal">
//             Home
//           </Typography>
//         </MenuItem>
//         <MenuItem className="flex items-center gap-2">
//           <MusicalNoteIcon strokeWidth={2} className="h-4 w-4" />
//           <Typography variant="small" className="font-normal">
//            My Events
//           </Typography>
//         </MenuItem>

//         <hr className="my-2 border-blue-gray-50" />
//         <MenuItem className="flex items-center gap-2 ">
//           <PowerIcon strokeWidth={2} className="h-4 w-4" />
//           <Typography variant="small" className="font-normal">
//             Sign Out
//           </Typography>
//         </MenuItem>
//       </MenuList>
//     </Menu>
//   );
// }

import { useState, useEffect } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Avatar,
} from '@material-tailwind/react';
import MainLogo from '../../logo/NJs0uK01.svg';

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);

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
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
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
    <Navbar fullWidth className="w-full max-w-screen-xl ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
       
        <div>
          <img
            src={MainLogo}
            alt="Active-Stage Logo"
            className="w-[200px] h-[100px]"
          />
        </div>
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          {' '}
        </Typography>
        <div className="hidden lg:block">{navList}</div>
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
