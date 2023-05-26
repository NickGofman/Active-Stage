import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import RegisterToEvent from '../popup/RegisterToEvent';
import { useRegisterToEvent } from '../../hooks/useMusicianEvents';
function EventCardMusician(props) {
  const { date, type, description, id, userId, userEmail } = props;
  const location = useLocation();
  console.log('ghghghhg', id, userId, userEmail);

  const {
    mutate: register,
    isError,
    error,
    isLoading,
  } = useRegisterToEvent(userId, id, userEmail);

//  if (isLoading) {
//    return <div>Loading....</div>;
//  }

//  if (isError) {
//    return error;
//  }

  const dateEvent = date.split('T')[0];
  const time = date.split('T')[1].substring(0, 5);

  return (
    //  className="flex flex-col   text-center text-gray-700 rounded-md border-2 py-8 max-w-sm"
    <Card className=" mt-6 w-96 justify-between text-center text-gray-700 rounded-md border-2">
      <CardBody className=" space-y-2">
        <Typography className="mt-1  text-s" variant="h3">
          {dateEvent}
        </Typography>
        <Typography variant="h4">{time}</Typography>
        <Typography variant="h4">{type}</Typography>

        <Typography className="text-center " variant="paragraph">
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="">
        {location?.pathname !== '/user/myevents' && (
          <RegisterToEvent
            EventId={id}
            date={dateEvent}
            hour={time}
            type={type}
            description={description}
            register={register}
          />
        )}
      </CardFooter>
    </Card>
  );
}

export default EventCardMusician;
