import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';

//component for block user warning dialog
function BlockUserWarning({ handleBlockUser, userId }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleBlock = () => {
    handleBlockUser(userId);
    setOpen(false);
  };

  return (
    <>
      <Button color="red" onClick={handleOpen}>
        Block user
      </Button>
      <Dialog open={open} handler={handleOpen} className='dark:bg-black'>
        <DialogHeader>
          <Typography
            variant="h5"
            className="dark:text-white "
            color="blue-gray"
          >
            Block Musician
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            You are about to block a musician!
          </Typography>
          <Typography className="text-center font-normal text-lg">
            This action is irreversible, this action will block the musician and
            remove him from all the events he is assigned to. Are you sure?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            No
          </Button>
          <Button color="red" variant="gradient" onClick={handleBlock}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default BlockUserWarning;
