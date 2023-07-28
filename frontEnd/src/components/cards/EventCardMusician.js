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
import { format,subHours} from 'date-fns';
import Loader from '../loader/Loader';

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
    return <Loader />;
  }

  if (isError) {
    return error;
  }
  if (isLoadingUnregister) {
    return <Loader/>;
  }

  if (isErrorUnregister) {
    return errorUnregister;
  }
  const UnRegister = () => {
    unregister();
  };
  let dateObj = new Date(date);
  dateObj=subHours(dateObj,3);
  const time = format(dateObj, 'HH:mm');

  const dateFormatted=format(dateObj,'dd-MM-yyyy');

  return (
    //  className="flex flex-col   text-center text-gray-700 rounded-md border-2 py-8 max-w-sm"
    <Card className=" mt-6 w-96 justify-between text-center dark:text-white rounded-md border-2">
      <CardBody className=" space-y-2 h-full dark:bg-black">
        <Typography className="mt-1  text-s" variant="h3">
          {dateFormatted}
        </Typography>
        <Typography variant="h4">{time}</Typography>
        <Typography variant="h4">{type}</Typography>
        <Typography   variant="paragraph" >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="dark:bg-black">
        {location?.pathname !== '/user/myevents' && (
          <RegisterToEvent
            EventId={eventId}
            date={dateFormatted}
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
