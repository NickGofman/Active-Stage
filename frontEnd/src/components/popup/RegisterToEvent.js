import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';

function RegisterToEvent({ date, hour, type, description, handleClick }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  // axios request for assign
  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm" color="blue">
        Register
      </Button>
      <Dialog
        className="w-4/5 max-w-[80%] lg:w-2/5 lg:max-w-[40%] md:w-3/5 md:max-w-[60%] "
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Register To Event: {date}</DialogHeader>
        <DialogBody className="flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="flex  items-center">
            <Typography variant="lead">
              You are about to register to the Event:
            </Typography>
          </div>
          <div>
            <Typography variant="h3">Time: {hour}</Typography>
            <Typography variant="h4">Event: {type}</Typography>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Typography color="red" variant="lead">
            Are You Sure?
          </Typography>

          <Button
            variant="outlined"
            size="sm"
            className="max-w-sm"
            onClick={handleClick}
          >
            Register
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default RegisterToEvent;
