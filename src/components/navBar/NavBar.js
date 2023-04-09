import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from '@material-tailwind/react';
import {
  HomeIcon,
  PowerIcon,
  MusicalNoteIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="candice wu"
          className="cursor-pointer"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </MenuHandler>
      <MenuList>
        
        <MenuItem className="flex items-center gap-2">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <HomeIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Home
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <MusicalNoteIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
           My Events
          </Typography>
        </MenuItem>
       
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
