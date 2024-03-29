import React from 'react';
import { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import { useCancelEvent } from '../../hooks/useAdminEvents';
import { format, subHours } from 'date-fns';
import Loader from '../loader/Loader';

function WarningCancel({ disabled, EventDate, EventId, eventStatus }) {
  // Format the event date
  const dateObj = new Date(EventDate);
  const newDate = subHours(dateObj, 3);
  const formattedDate = format(newDate, ' dd-MM-yyyy HH:mm ');

  
  const [open, setOpen] = useState(false);
  const { isLoading, error, mutate: cancelEvent } = useCancelEvent();
  const handleOpen = () => setOpen(!open);
  function handleCancel() {
    cancelEvent({ EventId, eventStatus });
    setOpen(false);
  }
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Fragment>
      <Button disabled={!disabled} onClick={handleOpen} size="sm" color="red">
        Cancel
      </Button>
      <Dialog
        className="dark:bg-black"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="dark:text-white">
          Cancel Event at: {formattedDate}
        </DialogHeader>
        <DialogBody divider>
          <Typography variant="h5" color="red" className="mb-2">
            Are you sure you want to cancel this event?!
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCancel}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default WarningCancel;
