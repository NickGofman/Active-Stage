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
import { format, subHours } from 'date-fns';
import Loader from '../loader/Loader';
function EventCardMusician(props) {
  // Extracting necessary props and context from React
  const { currentUser } = useContext(AuthContext);
  const { date, type, description, eventId, userId, header } = props;
  const userEmail = currentUser ? currentUser.Email : null;
  // React-router-dom hook to get the current location

  const location = useLocation();

  // Custom hooks to handle event registration and unregistration
  const {
    mutate: register,
    isError,
    isLoading,
  } = useRegisterToEvent(userId, eventId, userEmail);
  const {
    mutate: unregister,
    isError: isErrorUnregister,
    isLoading: isLoadingUnregister,
  } = useUnregisterToEvent(userId, eventId);

  if (isLoading || isLoadingUnregister) {
    return <Loader />;
  }

  if (isError || isErrorUnregister) {
    return <div>ERROR</div>;
  }

  // Function to handle event unregistration
  const UnRegister = () => {
    unregister();
  };
  // Format date and time using date-fns library

  let dateObj = new Date(date);
  dateObj = subHours(dateObj, 3);
  const time = format(dateObj, 'HH:mm');

  const dateFormatted = format(dateObj, 'dd-MM-yyyy');

  return (
    <Card className=" mt-6 w-96 justify-between text-center dark:text-white dark:bg-black rounded-md border-2">
      <CardBody className=" space-y-2 ">
        <Typography className="mt-1  text-s" variant="h3">
          {dateFormatted}
        </Typography>
        <Typography variant="h4">{time}</Typography>
        <Typography variant="h4">{type}</Typography>
        <Typography variant="paragraph" className="break-words">
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="dark:bg-black">
        {location?.pathname !== '/user/myEvents' && (
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
