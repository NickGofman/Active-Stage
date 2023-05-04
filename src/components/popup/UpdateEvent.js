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
import Datepicker from 'react-tailwindcss-datepicker';
function UpdateEvent(props) {
  const { EventDate, EventID, MusicalType, disabled } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
  });
  const handleOpen = () => setOpen(!open);
  // get users that assign to event
  const usersList = function getUsres(EventID) {
    // handle cancel button click
  };
  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
  };
  //use axios assign user to event
  return (
    <Fragment>
      <Button onClick={handleOpen} disabled={!disabled} size="sm">
        Update
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Update Event Info</DialogHeader>
        <DialogBody divider>
          <Typography variant="lead">Event Date: {EventDate}</Typography>
          <div className="flex flex-col w-72  gap-6">
            <Datepicker
              minDate={new Date()}
              containerClassName=" relative max-w-sm"
              useRange={false}
              value={date}
              asSingle={true}
              onChange={handleDateChange}
              displayFormat={'DD/MM/YYYY'}
            />
            <Input size="lg" label="time" />

            <Input size="lg" label={MusicalType} />
          </div>
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

export default UpdateEvent;
