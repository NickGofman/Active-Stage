import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import RegisterToEvent from '../popup/RegisterToEvent';
function EventCardMusician(props) {
  const { date, hour, type, description, id } = props;
  // Register user to event
  const handleRegister = (id, userId) => {};
  const location = useLocation();
  return (
    //  className="flex flex-col   text-center text-gray-700 rounded-md border-2 py-8 max-w-sm"
    <Card className=" mt-6 w-96 justify-between text-center text-gray-700 rounded-md border-2">
      <CardBody className=" space-y-2">
        <Typography className="mt-1  text-s" variant="h3">
          {date}
        </Typography>
        <Typography variant="h3">{hour}</Typography>
        <Typography variant="h4">{type}</Typography>

        <Typography className="text-center " variant="paragraph">
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="">
        {location.pathname !== '/user/myevents' && (
          <RegisterToEvent
            date={date}
            hour={hour}
            type={type}
            description={description}
            handleClick={handleRegister}
          />
        )}
      </CardFooter>
    </Card>
  );
}

export default EventCardMusician;
