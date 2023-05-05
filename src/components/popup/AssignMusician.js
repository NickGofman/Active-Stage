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
import ProfileInfoPopover from './ProfileInfoPopover';

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
  return (
    <Fragment>
      <Button onClick={handleOpen} size="sm" color="green" disabled={!disabled}>
        Assign
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
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default AssignMusician;
