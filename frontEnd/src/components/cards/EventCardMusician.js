import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import RegisterToEvent from '../popup/RegisterToEvent';
import {
  useRegisterToEvent,
  useUnregisterToEvent,
} from '../../hooks/useMusicianEvents';
import { AuthContext } from '../context/authContext';

function EventCardMusician(props) {
  const { currentUser } = useContext(AuthContext);
  const { date, type, description, eventId, userId, header } = props;
  const userEmail = currentUser ? currentUser.Email : null;
  const {
    mutate: register,
    isError,
    error,
    isLoading,
  } = useRegisterToEvent(userId, eventId, userEmail);
  const {
    mutate: unregister,
    isError: isErrorUnregister,
    error: errorUnregister,
    isLoading: isLoadingUnregister,
  } = useUnregisterToEvent(userId, eventId);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return error;
  }
  if (isLoadingUnregister) {
    return <div>Loading....</div>;
  }

  if (isErrorUnregister) {
    return errorUnregister;
  }
  const UnRegister = () => {
    unregister();
  };

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
            EventId={eventId}
            date={dateEvent}
            hour={time}
            type={type}
            description={description}
            register={register}
          />
        )}
        {header === 'Registered Events' && (
          <Button onClick={UnRegister}>Unregister</Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default EventCardMusician;
