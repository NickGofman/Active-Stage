import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
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
import { FaPlus } from 'react-icons/fa';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  useCreateNewEvent,
  useGetMusicalStyles,
  useGetEventDates,
} from '../../hooks/useAdminEvents';
function CreateNewEvent() {
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: ' ',
  });
  const [inputs, setInputs] = useState({
    date: '',
    description: '',
    time: '21:00',
  });
  const handleOpen = () => {
    setOpen(!open);
    setErr('');
  };
  const {
    data: eventDates,
    isError: datesIsError,
    isLoading: datesIsLoading,
    error: datesError,
  } = useGetEventDates();
  //map over the dates to disable days that have events
  const modifiedEventDates = eventDates?.data.map((item) => {
    return { startDate: item.startDate, endDate: item.startDate };
  });

  const {
    isLoading: musicalStyleLoading,
    data: musicalStyleList,
    isError: musicalStyleIsError,
    error: musicalStyleError,
  } = useGetMusicalStyles();
  const {
    mutate: createEvent,
   
    isError,
    error,
  } = useCreateNewEvent();
  if (musicalStyleLoading) {
    return <div>musicalStyleLoading...</div>;
  }
  if (musicalStyleIsError) {
    console.log(musicalStyleError);
  }

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeStyle = (e) => {
    // console.log('INDEX', selectedIndex);
    setInputs((prevState) => ({ ...prevState, musicalTypeId: e }));
  };
  const handleDateChange = (newValue) => {
    // console.log('newValue:', newValue);
    setDate(newValue);
    setInputs((prevState) => ({ ...prevState, date: newValue.startDate }));

    // setInputs(newValue);
  };

  //create new event
  const handleCreateEvent = () => {
    const { date, time, ...otherInput } = inputs;
    const dateTime = `${date} ${time}`;

    if (date !== '' && time !== '' && inputs.musicalTypeId !== undefined) {
      otherInput.dateTime = dateTime;
      console.log('otherInput', otherInput);
      createEvent(otherInput);
    } else {
      console.log('else:');
      setErr('Must select a Date, Time and Musical style');
      return;
    }
 
    console.log(isError);
    if (isError) {
      setInputs({
        date: '',
        description: '',
        time: '21:00',
      });
      setDate({ startDate: ' ', endDate: ' ' });
      console.log('IN ERROR');
      //TODO-delete if (we have disabled dates- no need of date validation)
      if (error.response.status === 409) {
        // Event already exists on the specified date
        setErr(error.response.data);
      } else {
        // Other error occurred
        setErr('Failed to create a new event.');
      }
      console.log('CREATE EVENT ERROR:', error);
    } else {
      
      setInputs({
        date: '',
        description: '',
        time: '21:00',
      });
      setDate({ startDate: ' ', endDate: ' ' });
    }
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
            <Typography variant="small">Pick A Date:</Typography>
            <Datepicker
              minDate={new Date()}
              containerClassName=" relative max-w-sm"
              useRange={false}
              value={date}
              asSingle={true}
              onChange={handleDateChange}
              displayFormat={'DD/MM/YYYY'}
              disabledDates={modifiedEventDates}
            />
            <Input
              name="time"
              type="time"
              size="lg"
              label="time"
              value={inputs.time}
              onChange={handleChange}
            />

            <Select
              className="col-span-1"
              label="Select Musical Type"
              name="musicalStyle"
              onChange={handleChangeStyle}
            >
              {musicalStyleList?.data?.map((style) => (
                <Option
                  name="musicalStyle"
                  key={style.MusicalTypeID}
                  value={style.MusicalTypeID.toString()}
                >
                  {style.MusicalTypeName}
                </Option>
              ))}
            </Select>
            <Textarea
              name="description"
              variant="outlined"
              label="Description"
              value={inputs.description}
              onChange={handleChange}
            />
            <Typography variant="h6" color="red">
              {err && err}
            </Typography>
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
