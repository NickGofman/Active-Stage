import React, { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from '@material-tailwind/react';
import { subHours, format } from 'date-fns';
import MusicianAssignCard from '../cards/MusicianAssignCard';
import { useGetAllUsersPerEvent } from '../../hooks/useAdminEvents';
import Loader from '../loader/Loader';

function AssignMusician(props) {
  const { EventDate, EventId, disabled } = props;
  const dateObj = new Date(EventDate);
  const newDate = subHours(dateObj, 3);
  const formattedDate = format(newDate, ' dd-MM-yyyy HH:mm ');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const {
    data: dataRegistered,
    error,
    isError,
    isLoading,
  } = useGetAllUsersPerEvent(EventId);





  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    console.error(error);
  }

  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm" color="green" disabled={!disabled}>
        Assign
      </Button>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="dark:bg-black"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-between dark:text-white ">
          Assign Musician
          <Typography variant="lead">Event Date:{formattedDate}</Typography>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          {dataRegistered?.data?.length === 0 ? (
            <Typography className="font-bold dark:text-white">
              No musicians to assign.
            </Typography>
          ) : (
            <div className="flex flex-row justify-center flex-wrap  gap-4 ">
              {dataRegistered?.data?.map((data) => (
                <MusicianAssignCard
                  key={data.UserId}
                  eventId={EventId}
                  userId={data.UserId}
                  bandName={data.BandName}
                  experience={data.YearsOfExperience}
                  Url={data.URL}
                  description={data.Description}
                  setOpen={setOpen}
                  phoneNumber={data.PhoneNumber}
                  Photo={data.Photo}
                />
              ))}
            </div>
          )}
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}

export default AssignMusician;
