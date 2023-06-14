import React from 'react';
import { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from '@material-tailwind/react';
import MusicianAssignCard from '../cards/MusicianAssignCard';
import { useGetAllUsersPerEvent } from '../../hooks/useAdminEvents';
function AssignMusician(props) {
  const { EventDate, EventId, disabled } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  //TODO get users that assign to event axios
  


  //use axios assign user to event
  function handleAssign(EventID, userID) {
    // handle cancel button click
  }
  const {
    data: dataRegistered,
    error,
    isError,
    isLoading,
  } = useGetAllUsersPerEvent(EventId);
  
  
if(isLoading)
{
  return <div>Loading...</div>
}
if(isError)
{
   console.error(error)
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
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-between">
          Assign Musician
          <Typography variant="lead">Event Date: {EventDate}</Typography>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 "
          >
            <span>Cancel</span>
          </Button>
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          {dataRegistered?.data?.length === 0 ? (
            <div>No musicians assigned.</div>
          ) : (
            <div className="flex flex-col flex-auto items-center">
              {dataRegistered?.data?.map((data) => (
                <MusicianAssignCard
                  key={data.UserId}
                  eventId={EventId}
                  userId={data.UserId}
                  bandName={data.BandName}
                  experience={data.YearsOfExperience}
                  description={data.Description}
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
