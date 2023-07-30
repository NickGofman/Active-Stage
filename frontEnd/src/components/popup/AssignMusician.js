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
  const { EventDate, EventId, disabled, assignedBandName } = props;
  // date formatting
  const dateObj = new Date(EventDate);
  const newDate = subHours(dateObj, 3);
  const formattedDate = format(newDate, ' dd-MM-yyyy HH:mm ');

  // State to handle the dialog open/close
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  // Fetch registered musicians for the event using the useGetAllUsersPerEvent hook
  const {
    data: dataRegistered,
    isError,
    isLoading,
  } = useGetAllUsersPerEvent(EventId);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>ERROR</div>;
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
        <DialogBody divider className="h-[28rem] overflow-y-scroll">
          {/* Conditionally render the list of musicians or a message if no musicians */}
          {dataRegistered?.data?.length === 0 ? (
            <Typography className="font-bold dark:text-white">
              No musicians to assign.
            </Typography>
          ) : (
            <div className="flex flex-row justify-center flex-wrap  gap-4 ">
              {/* Render each musician card */}
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
                  assignedBandName={assignedBandName}
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
