import React from 'react';
import { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
function EventIncome(props) {
  const { EventDate, BandName, EvnetID } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  //use axios assign income to the database and change event status to closed
  function handleCancel(EventID) {
    // handle cancel button click
  }
  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm">
        Add Income
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Assign Income</DialogHeader>
        <DialogBody divider>
          <Typography variant="lead">Event Date: {EventDate}</Typography>
          <Typography>Band Name: {BandName}</Typography>
          <Input size="md" label="Income" />
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default EventIncome;
