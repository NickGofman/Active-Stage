import React, { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { format, subHours } from 'date-fns';
import { useAddIncome } from '../../hooks/useAdminEvents';
import Loader from '../loader/Loader';

function EventIncome(props) {
  const { EventDate, BandName, EventId, disabled } = props;

  // State to manage dialog visibility and income amount
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState('');

  // Formatting the event date
  const dateObj = new Date(EventDate);
  const newDate = subHours(dateObj, 3);
  const formattedDate = format(newDate, ' dd-MM-yyyy HH:mm ');

  // Custom hook to add income for the event
  const { isLoading, error, mutate } = useAddIncome();

  // Function to handle opening the dialog
  const handleOpen = () => setOpen(!open);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  // Function to handle adding income to the event
  const handleAddIncome = () => {
    const parsedIncome = +income; // Parse the income value to a number
    if (!isNaN(parsedIncome)) {
      const data = { eventId: EventId, income: parsedIncome };
      mutate(data);
      handleOpen();
    }
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        size="sm"
        color="yellow"
        disabled={!disabled}
      >
        Add Income
      </Button>
      <Dialog
        className="dark:bg-black "
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="dark:text-white">Assign Income</DialogHeader>
        <DialogBody divider className="dark:bg-black">
          <Typography className="dark:text-white" variant="lead">
            Event Date: {formattedDate}
          </Typography>
          <Typography className="dark:text-white">
            Band Name: {BandName}
          </Typography>
          <Input
            size="md"
            label="Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="dark:text-white"
          />
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
          <Button variant="gradient" color="green" onClick={handleAddIncome}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default EventIncome;
