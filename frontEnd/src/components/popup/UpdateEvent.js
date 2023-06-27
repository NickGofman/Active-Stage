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
  Select,
  Textarea,
  Option,
} from '@material-tailwind/react';
import {
  useGetMusicalStyles,
  useGetEventDates,
  useUpdateEvent,
} from '../../hooks/useAdminEvents';
import Datepicker from 'react-tailwindcss-datepicker';
function UpdateEvent(props) {
  const {
    EventDate,
    EventId,
    MusicalTypeId,
    disabled,
    EventTime,
    Description,
    musicalStyleList,
    musicalTypeName,
  } = props;
 
   const [inputs, setInputs] = useState({
     date: '',
     description: Description,
     time: EventTime,
   });
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState({
    startDate: '',
  });

  const {
    mutate: updateEvent,

    isError,
    error,
  } = useUpdateEvent();
  // const {
  //   isLoading: musicalStyleLoading,
  //   data: musicalStyleList,
  //   isError: musicalStyleIsError,
  //   error: musicalStyleError,
  // } = useGetMusicalStyles();
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
  // if (musicalStyleLoading) {
  //   return <div>musicalStyleLoading...</div>;
  // }
  // if (musicalStyleIsError) {
  //   console.log(musicalStyleError);
  // }
 
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDateChange = (newValue) => {
    // console.log('newValue:', newValue);
    setDate(newValue);
    setInputs((prevState) => ({ ...prevState, date: newValue.startDate }));

    // setInputs(newValue);
  };
  const handleChangeStyle = (e) => {
    setInputs((prevState) => ({ ...prevState, MusicalTypeId: e }));
  };
  const handleOpen = () => setOpen(!open);
  const handleConfirm = () => {
    // TODO: Perform update logic with the new date and time values
    const updatedEvent = {
      date: inputs.date !== '' ? inputs.date : EventDate, // Use the new date value if provided, otherwise use the existing EventDate
      time: inputs.time !== '' ? inputs.time : EventTime, // Use the new time value if provided, otherwise use the default value
      //TODO get the index of the musical style of the original event if the user don't change it (or set default -> if we don't choose any style the program crash)
      musicalTypeId:
        inputs.MusicalTypeId !== undefined
          ? inputs.MusicalTypeId
          : MusicalTypeId,
      description: inputs.description !== '' ? inputs.description : '', // Use the new description value if provided, otherwise use an empty string
    };
    const dateTime = `${updatedEvent.date} ${updatedEvent.time}`;
    updatedEvent.dateTime = dateTime;

    updatedEvent.eventId = EventId;
    updateEvent(updatedEvent);
    // Close the dialog
    setOpen(false);
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
              popoverDirection="down"
              disabledDates={modifiedEventDates}
            />
            <Input
              name="time"
              type="time"
              size="lg"
              label="Time"
              value={inputs.time}
              onChange={handleChange}
            />
            <Select
              className="col-span-1"
              label={musicalTypeName}
              name="musicalStyle"
              onChange={handleChangeStyle}
            >
              {musicalStyleList.map((style) => (
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
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default UpdateEvent;
