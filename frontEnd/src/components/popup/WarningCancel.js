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

function WarningCancel({ disabled, EventDate, EventId }) {
  const [open, setOpen] = useState(false);
  const { isLoading, error, mutate } = useCancelEvent();
  const handleOpen = () => setOpen(!open);
  //use axios to change the event status to cancel
  function handleCancel() {
    mutate(EventId);
    setOpen(false);
    // handle cancel button click
  }
   if (isLoading) {
     return <div>Loading...</div>;
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
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Cancel Event at: {EventDate}</DialogHeader>
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
