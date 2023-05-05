import React from 'react';
import { Fragment, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import MusicianAssignCard from '../cards/MusicianAssignCard';
function AssignMusician(props) {
  const { EventDate, EventID, disabled } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  // get users that assign to event
  const usersList = function getUsres(EventID) {
    // handle cancel button click
  };

  //use axios assign user to event
  function handleCancel(EventID, userID) {
    // handle cancel button click
  }
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

  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm" color="green" disabled={!disabled}>
        Assign
      </Button>
      <Dialog
        size="xxl"
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
          <ProfileInfoPopover/>
          {/* map throw the usersList  for each user add button with onclick*/}
          <div className="flex flex-col w-72 items-end gap-6">
            {/* band Name */}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 "
          >
            <span>Cancel</span>
          </Button>{' '}
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          {/* map throw the usersList  for each user add button with onclick*/}
          <div className="grid grid-cols-3 ">
            {dummyData.map((data) => (
              <MusicianAssignCard
                key={data.id}
                bandName={data.bandName}
                experience={data.experience}
                description={data.description}
              />
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}

export default AssignMusician;
