import React from 'react';
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from '@material-tailwind/react';
import { MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

export default function ProfileInfoPopover() {
  const [openPopover, setOpenPopover] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <Button variant="text">Profile Info</Button>
      </PopoverHandler>
      <PopoverContent {...triggers} className="max-w-[24rem]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Avatar
            size="md"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="candice wu"
          />
          <Button
            variant="gradient"
            color="blue"
            size="sm"
            className="font-medium capitalize"
          >
            Follow
          </Button>
        </div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-2 flex items-center gap-2 font-medium"
        ></Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Frontend Developer • Major interest in Web Development: motivated to
          achieve measurable results, to deepen my knowledge and improve my
          skills.
        </Typography>
        <div className="mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4">
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 text-xs font-normal"
          >
            <MapPinIcon strokeWidth={2} className="-mt-0.5 h-3.5 w-3.5" />
            United Kingdom
          </Typography>
          <Typography
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="flex items-center gap-1 text-xs font-normal"
          >
            <BuildingOffice2Icon
              strokeWidth={2}
              className="-mt-0.5 h-3.5 w-3.5"
            />
            Material Tailwind
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  );
}
