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
import { useQueryClient } from 'react-query';
import Loader from '../loader/Loader';
import { useAddNewMusicalStyle } from '../../hooks/useAdminActivities';
import { DarkModeContext } from '../../DarkModeContext';
function CreateNewEvent() {
  const { darkMode } = useContext(DarkModeContext);
  const [err, setErr] = useState('');
  const [errAdd, setErrAdd] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState({
    startDate: '',
  });
  const queryClient = useQueryClient();

  const [inputs, setInputs] = useState({
    date: '',
    description: '',
    time: '21:00',
    musicalTypeId: undefined,
  });

  const [musicalStyleToAdd, setMusicalStyleToAdd] = useState('');

  const handleChangeMusicalStyleAdd = (e) => {
    setMusicalStyleToAdd(e.target.value);
  };
  const handleOpen = () => {
    setOpen(!open);
    setErr('');
  };
  const {
    data: eventDates,
    isError: datesIsError,
    isLoading: datesIsLoading,
  } = useGetEventDates();
  //map over the dates to disable days that have events
  const modifiedEventDates = eventDates?.data.map((item) => {
    return { startDate: item.startDate, endDate: item.startDate };
  });

  const {
    isLoading: musicalStyleLoading,
    data: musicalStyleList,
    isError: musicalStyleIsError,
  } = useGetMusicalStyles();

  const onSuccess = () => {
    setErr('Event Created!');
    setInputs({
      description: '',
      time: '21:00',
    });

    queryClient.invalidateQueries('getEventDates');
  };
  const onError = () => {
    setErr('Failed To Create Event');
  };

  const onSuccessAdd = () => {
    setErrAdd('Musical style added!');
    setMusicalStyleToAdd('');

    queryClient.invalidateQueries('getEventDates');
  };
  const onErrorAdd = (error) => {
    setErrAdd(`${error.response.data.error}`);
  };

  const { mutate: addStyle } = useAddNewMusicalStyle(onSuccessAdd, onErrorAdd);
  const { mutate: createEvent } = useCreateNewEvent(onSuccess, onError);

  if (musicalStyleLoading || datesIsLoading) {
    return <Loader />;
  }
  if (musicalStyleIsError || datesIsError) {
    return <div>ERROR</div>;
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
    setDate(newValue);
    setInputs((prevState) => ({ ...prevState, date: newValue.startDate }));
  };
  //create new event
  const handleCreateEvent = () => {
    const { date, time, ...otherInput } = inputs;
    const dateTime = `${date} ${time}`;
    console.log(date);

    if (date !== null && time !== '' && inputs.musicalTypeId !== undefined) {
      otherInput.dateTime = dateTime;
      createEvent(otherInput);
      setDate({ startDate: '' });
      setInputs({
        ...inputs,
        musicalTypeId: '',
      });
    } else {
      setErr('Must select a Date, Time and Musical style');

      return;
    }
  };

  const handleAddMusicalStyle = () => {
    if (musicalStyleToAdd !== '') {
      addStyle(musicalStyleToAdd);
      setErrAdd('');
    } else setErrAdd('Style Input is empty!');
  };

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
        className="dark:bg-black dark:text-white "
      >
        <DialogHeader>Create New Event</DialogHeader>
        <DialogBody
          divider
          className="flex flex-col  lg:gap-3 lg:flex-row   md:flex-col dark:text-white"
        >
          <div className="flex flex-col w-72   gap-2">
            <Datepicker
              key={JSON.stringify(date)}
              minDate={new Date()}
              useRange={false}
              value={date}
              asSingle={true}
              onChange={handleDateChange}
              displayFormat={'DD/MM/YYYY'}
              disabledDates={modifiedEventDates}
              popoverDirection="down"
              placeholder="Pick A Date"
              containerClassName={`${
                darkMode
                  ? 'darkModeDatePicker  relative max-w-sm border-[1px] border-blue-gray-200 rounded-[7px]'
                  : ''
              }  relative max-w-sm border-[1px] border-blue-gray-200 rounded-[7px]`}
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
              className="col-span-1 dark:text-white "
              label="Select Musical Type"
              name="musicalStyle"
              value={inputs.musicalTypeId}
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
              className="dark:text-white"
            />
            <Typography variant="small" color="red">
              {err && err}
            </Typography>
          </div>
          <div className=" flex flex-col lg:justify-start  w-72 gap-2">
            <Input
              name="musicalStyleToAdd"
              type="text"
              size="lg"
              label="Add New Musical Style"
              value={musicalStyleToAdd}
              onChange={handleChangeMusicalStyleAdd}
              className="dark:text-white"
            />
            <Button
              variant="gradient"
              color="yellow"
              onClick={handleAddMusicalStyle}
            >
              <span>Add new Style</span>
            </Button>
            <Typography variant="small" color="red">
              {errAdd && errAdd}
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
