import {
  Card,
  Typography,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import React from 'react';
import { Button } from '@material-tailwind/react';
function MusicianAssignCard(props) {
  const { bandName, experience, description } = props;
  return (
    <Card className="mt-6 w-96 flex">
      <CardBody className="flex-1">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {bandName}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {experience}
        </Typography>
        <Typography variant="small">{description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Assign</Button>
      </CardFooter>
    </Card>
  );
}

export default MusicianAssignCard;
