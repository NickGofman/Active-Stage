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
  const { userId, eventId,bandName, experience, description } = props;
const { mutate } = useAssignMusicianById();

  const handleAssign = () => {
 const data = { eventId, userId };
 mutate(data);
  };
  return (
    <Card className="mt-6 w-96 items-center">
      <CardHeader>
        <h2 className="font-semibold text-gray-900">{bandName}</h2>
      </CardHeader>
      <CardBody className="flex-1">
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Preforming Already {experience} Years
          </Typography>
          <Typography variant="small">{description}</Typography>
        </ol>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleAssign}>Assign</Button>
        <Button color="red">Block User</Button>
      </CardFooter>
    </Card>
  );
}

export default MusicianAssignCard;
