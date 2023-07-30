import React, { useContext } from 'react';
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
import { useGetEventDates, useUpdateEvent } from '../../hooks/useAdminEvents';
import Datepicker from 'react-tailwindcss-datepicker';
import { format } from 'date-fns';
import Loader from '../loader/Loader';
import { DarkModeContext } from '../../DarkModeContext';
function UpdateEvent(props) {
  // Access the darkMode context to apply dark mode styles
  const { darkMode } = useContext(DarkModeContext);

  const {
    EventDate,
    EventId,
    MusicalTypeId,
    disabled,
    EventTime,
    Description,
    musicalStyleList,
    musicalTypeName,
    eventStatus,
  } = props;

  // Format the event date
  const dateObj = new Date(EventDate);
  const newDateObj = format(dateObj, 'dd-MM-yyyy');

  // State to manage the input values and dialog visibility
  const [inputs, setInputs] = useState({
    date: EventDate,
    description: Description,
    time: EventTime,
  });
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: EventDate,
    endDate: EventDate,
  });
  const [message, setMessage] = useState('');

  // Custom hook to Update Event
  const { mutate: updateEvent, isLoading, error, } = useUpdateEvent();

  // Custom hook to Get Event Dates
  const {
    data: eventDates,
    isError: datesIsError,
    isLoading: datesIsLoading,
  } = useGetEventDates();
  if (datesIsLoading || isLoading) return <Loader />;
  if (datesIsError || error) return <div>ERROR</div>;

  //map over the dates to disable days that have events
  const modifiedEventDates = eventDates?.data.map((item) => {
    return { startDate: item.startDate, endDate: item.startDate };
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle date change
  const handleDateChange = (newValue) => {
    setDate(newValue);
    setInputs((prevState) => ({ ...prevState, date: newValue.startDate }));
  };

  // Handle musical style change
  const handleChangeStyle = (e) => {
    setInputs((prevState) => ({ ...prevState, MusicalTypeId: e }));
  };

  const handleOpen = () => setOpen(!open);

  // Handle update event confirmation
  const handleConfirm = () => {
    const updatedEvent = {
      date: inputs.date !== '' ? inputs.date : EventDate, // Use the new date value if provided, otherwise use the existing EventDate
      time: inputs.time !== '' ? inputs.time : EventTime, // Use the new time value if provided, otherwise use the default value

      musicalTypeId:
        inputs.MusicalTypeId !== undefined
          ? inputs.MusicalTypeId
          : MusicalTypeId,
      description: inputs.description !== '' ? inputs.description : '', // Use the new description value if provided, otherwise use an empty string
    };
    // Concatenate date and time to create a new date-time string
    const dateTime = `${updatedEvent.date} ${updatedEvent.time}`;
    updatedEvent.dateTime = dateTime;

    // Assign event ID and status to the updatedEvent object
    updatedEvent.eventId = EventId;
    updatedEvent.Status = eventStatus;

    // If date is not provided, show an error message and return
    if (inputs.date === null) {
      setMessage('Date must be fulfilled');
      return;
    }
    // Call the updateEvent function to update the event data
    updateEvent(updatedEvent);
    // Close the dialog
    setOpen(false);
  };
  return (
    <Fragment>
      <Button onClick={handleOpen} disabled={!disabled} size="sm">
        Update
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="dark:bg-black "
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="dark:text-white">
          Update Event Info
        </DialogHeader>
        <DialogBody divider>
          <Typography variant="lead" className="dark:text-white">
            Event Date: {newDateObj} {EventTime}
          </Typography>
          <div className="flex flex-col w-72  gap-6">
            <Datepicker
              minDate={new Date()}
              // containerClassName=" relative max-w-sm"
              useRange={false}
              value={date}
              asSingle={true}
              onChange={handleDateChange}
              displayFormat={'DD/MM/YYYY'}
              popoverDirection="down"
              disabledDates={modifiedEventDates}
              containerClassName={`${
                darkMode
                  ? 'darkModeDatePicker  relative max-w-sm border-[1px] border-blue-gray-200 rounded-[7px]'
                  : ''
              }  relative max-w-sm border-[1px] border-blue-gray-200 rounded-[7px] `}
            />
            <Input
              name="time"
              type="time"
              size="lg"
              label="Time"
              value={inputs.time}
              onChange={handleChange}
              className="dark:text-white"
            />
            <Select
              className="col-span-1 dark:text-white"
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
              className="dark:text-white"
            />
            <p className="text-red-500">{message}</p>
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
