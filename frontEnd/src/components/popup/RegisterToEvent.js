import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';

function RegisterToEvent({ date, hour, type, register }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  // Register user to event
  const handleRegister = () => {
    register();
  };

  // axios request for assign
  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm" color="blue">
        Register
      </Button>
      <Dialog
        className="w-4/5 max-w-[80%] lg:w-2/5 lg:max-w-[40%] md:w-3/5 md:max-w-[60%]  dark:bg-black "
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="dark:text-white">
          Register To Event {date}
        </DialogHeader>
        <DialogBody className="flex flex-col lg:flex-row items-center lg:justify-between dark:text-white">
          <div className="flex  items-start flex-col">
            <Typography variant="paragraph">Time: {hour}</Typography>
            <Typography variant="paragraph">Musical Style: {type}</Typography>
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
            onClick={handleRegister}
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
