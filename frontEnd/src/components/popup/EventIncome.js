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
import { useAddIncome } from '../../hooks/useAdminEvents';


function EventIncome(props) {
  const { EventDate, BandName, EventId, disabled } = props;
  const [open, setOpen] = useState(false);
  const [income, setIncome] = useState('');
  const { isLoading, error, mutate } = useAddIncome();

  const handleOpen = () => setOpen(!open);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
          <Input
            size="md"
            label="Income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
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
