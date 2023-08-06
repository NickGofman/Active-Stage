import {
  Button,
  Card,
  Typography,
  CardBody,
  CardFooter,
  CardHeader,
} from '@material-tailwind/react';
import React from 'react';
import { useAssignMusicianById } from '../../hooks/useAdminEvents';
import { useBlockUser } from '../../hooks/useAdminActivities';
import BlockUserWarning from '../popup/BlockUserWarning';

function MusicianAssignCard(props) {
  const {
    userId,
    eventId,
    bandName,
    experience,
    description,
    setOpen,
    Url,
    phoneNumber,
    Photo,
    assignedBandName,
  } = props;
  // Custom hooks to handle musician assignment and user blocking
  const { mutate: assignMusician } = useAssignMusicianById();
  const { mutate: blockUser } = useBlockUser();

  const handleAssign = () => {
    const data = { eventId, userId };
    assignMusician(data);
    // Activate the setOpen function to close the dialog
    setOpen(false);
  };

  return (
    <Card className="mt-6 w-96 flex dark:bg-black dark:text-white">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={
            Photo
              ? `http://localhost:3001/${Photo}`
              : `http://localhost:3001/ProfileImg.jpg`
          }
          alt="profileImage"
        />
      </CardHeader>
      <CardBody className="flex-1 ">
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 dark:text-white"
        >
          Band Name: {bandName}
        </Typography>
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-2 dark:text-white"
        >
          Preforming Already {experience} Years
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-2 dark:text-white font-bold text-sm"
        >
          Phone Number: {phoneNumber}
        </Typography>
        {Url && (
          <a
            href={Url}
            target="_blank"
            rel="noreferrer"
            className="mb-2 text-black font-bold text-sm truncate max-w-[350px] text-ellipsis block"
          >
            Youtube Channel: {Url}
          </a>
        )}
        <Typography className="break-words">{description}</Typography>
      </CardBody>

      <CardFooter className="flex gap-28">
        <Button disabled={bandName === assignedBandName} onClick={handleAssign}>
          Assign
        </Button>
        <BlockUserWarning handleBlockUser={blockUser} userId={userId} />
      </CardFooter>
    </Card>
  );
}

export default MusicianAssignCard;
