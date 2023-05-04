import React from 'react';
import { Fragment, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import Datepicker from 'react-tailwindcss-datepicker';

function CreateNewEvent(props) {
  const { EventDate, EventID, MusicalType, disabled } = props;
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
  });
  const [time, setTime] = useState('10:00');
  const [description, setDescription] = useState('');
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
      <Button
        className="flex flex-col items-center justify-center space-y-2 w-full"
        onClick={handleOpen}
      >
        <FaPlus size={30} />
        <span>Create new event</span>
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Create New Event</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col w-72  gap-2">
            <Typography variant="small">Pick A Date: {EventDate}</Typography>
            <Datepicker
              minDate={new Date()}
              containerClassName=" relative max-w-sm"
              useRange={false}
              value={date}
              asSingle={true}
              onChange={handleDateChange}
              displayFormat={'DD/MM/YYYY'}
            />

            <Typography variant="small">Set Time: {time} </Typography>
            <Input
              type="time"
              size="lg"
              label="time"
              onChange={(e) => setTime(e.target.value)}
            />
            <Typography variant="small">Description: </Typography>
            <Textarea
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
            />
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
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default CreateNewEvent;
