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

function MusicianAssignCard(props) {
  const { userId, eventId, bandName, experience, description, setOpen,Url } = props;
  const { mutate } = useAssignMusicianById();

  const handleAssign = () => {
    const data = { eventId, userId };
    mutate(data);
    setOpen(false); // Activate the setOpen function to close the dialog
  };

  return (
    <Card className="mt-6 w-96 items-center">
      <CardHeader>
        <h2 className="font-semibold text-gray-900">{bandName}</h2>
      </CardHeader>
      <CardBody className="flex-1">
        <div className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Preforming Already {experience} Years
          </Typography>
          {Url && (
            <a href={Url} target="_blank"  rel='noreferrer' className="mb-2 text-black font-bold">
              Youtube Channel: {Url}
            </a>
          )}
          <Typography variant="small">{description}</Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleAssign}>Assign</Button>
        <Button color="red">Block User</Button>
      </CardFooter>
    </Card>
  );
}

export default MusicianAssignCard;
