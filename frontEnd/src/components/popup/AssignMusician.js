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
  const dummyData = [
    {
      id: 1,
      bandName: 'The Beatles',
      experience: 'Legendary',
      description: 'One of the most influential bands in the history of music',
    },
    {
      id: 2,
      bandName: 'Led Zeppelin',
      experience: 'Legendary',
      description: 'One of the greatest rock bands of all time',
    },
    {
      id: 3,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description: 'A pioneer of progressive rock music',
    },
    {
      id: 4,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description:
        'A pioneer progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicof progressive rock music',
    },
    {
      id: 6,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description: 'A pioneer of progressive rock music',
    },
    {
      id: 5,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description:
        'A pioneer oprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicf progressive rock music',
    },
    {
      id: 7,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description: 'A pioneer of progressive rock music',
    },
    {
      id: 8,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description:
        'A pioneeprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicr of progressive rock music',
    },
    {
      id: 9,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description: 'A pioneer of progressive rock music',
    },
    {
      id: 10,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description:
        'Aprogressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock music pioneer of progressive rock music',
    },
    {
      id: 11,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description:
        'A pioneer of progressive rock music A pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock musicA pioneer of progressive rock music',
    },
    {
      id: 12,
      bandName: 'Pink Floyd',
      experience: 'Legendary',
      description: 'A pioneer of progressive rock music',
    },
  ];
  
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
          {/* map throw the usersList  for each user add button with onclick*/}
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
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}

export default AssignMusician;
