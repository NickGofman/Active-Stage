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
  Select,
  Option,
} from '@material-tailwind/react';
import Datepicker from 'react-tailwindcss-datepicker';

function CreateNewEvent() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(),
  });
  const [inputs, setInputs] = useState({
    date: '',
    description: '',
    musicalStyle: '',
    time: '',
  });

  //get musical style from DB, table typesdescription
  const musicalTypes = [
    'Classical',
    'Jazz',
    'Rock',
    'Hip Hop',
    'Pop',
    'Blues',
    'Country',
    'Reggae',
    'Electronic',
    'Folk',
    'Metal',
    'Punk',
    'R&B',
    'Soul',
    'Alternative',
    'Gospel',
  ];

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeStyle = (e) => {
    setInputs((prevState) => ({ ...prevState, musicalStyle: e }));
  };
  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
    setInputs((prevState) => ({ ...prevState, date: newValue.startDate }));

    // setInputs(newValue);
  };
  //create new event
  const handleCreateEvent = () => {
    const { date, time } = inputs;
    const dateTime = `${date} ${time}`;
    console.log(dateTime);

    // Perform actions with the dateTime value, such as saving to the database

    // Reset the inputs
    setInputs({
      date: '',
      time: '10:00',
      musicalStyle: '',
      description: '',
    });

    // Close the dialog
    setOpen(false);
  };
  console.log('INPUTS:', inputs);

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
            <Typography variant="small">Pick A Date: {}</Typography>
            <Datepicker
              minDate={new Date()}
              containerClassName=" relative max-w-sm"
              useRange={false}
              value={date}
              asSingle={true}
              onChange={handleDateChange}
              displayFormat={'DD/MM/YYYY'}
            />
            <Input
              name="time"
              type="time"
              size="lg"
              label="time"
              onChange={handleChange}
            />

            <Select
              className="col-span-1"
              label="Select band name"
              name="musicalStyle"
              onChange={handleChangeStyle}
            >
              {musicalTypes.map((style, index) => (
                <Option name="musicalStyle" key={index} value={style}>
                  {style}
                </Option>
              ))}
            </Select>
            <Textarea
              name="description"
              variant="outlined"
              label="Description"
              onChange={handleChange}
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
          <Button variant="gradient" color="green" onClick={handleCreateEvent}>
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default CreateNewEvent;
