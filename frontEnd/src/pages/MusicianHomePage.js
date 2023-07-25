import React from 'react';
import PaginationEvents from '../components/pagination/PaginationEvents';
import { Card, Typography, CardBody } from '@material-tailwind/react';
import {
  useAllAssignedEvents,
  useAllPublishedEvents,
  useAllRegisteredEvents,
} from '../hooks/useMusicianEvents';
import { format, subHours } from 'date-fns';
import Loader from '../components/loader/Loader';
function MusicianHomePage() {
  //TODO REMOVE ALL DRILLING userID and Email -> USE USeContext
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.UserId : null;
  const userEmail = user ? user.Email : null;
  const {
    isLoading: isLoadingPublishedEvents,
    data: dataPublishedEvents,
    isError: isErrorPublishedEvents,
    error: errorPublishedEvents,
  } = useAllPublishedEvents(userId);
  // make sure the musician is'nt already registered to the current event,
  const { isLoading, data, isError, error } = useAllRegisteredEvents(userId);
  const {
    isLoading: isLoadingAllAssigned,
    data: dataAllAssigned,
    isError: isErrorAllAssigned,
    error: errorAllAssigned,
  } = useAllAssignedEvents(userId);
  if (isLoadingPublishedEvents || isLoading || isLoadingAllAssigned) {
    return <Loader/>;
  }

  if (isErrorPublishedEvents || isError || isErrorAllAssigned) {
    return (
      <div>Error: {errorPublishedEvents || error || errorAllAssigned}</div>
    );
  }
  const numberOfEvents = data?.data?.length;
  const nextEventDate = dataAllAssigned?.data[0]?.Date.split('T')[0];
  let formattedDate='';
  if (nextEventDate !== undefined) {
    let dateObj = new Date(nextEventDate);
    dateObj = subHours(dateObj, 3);
    formattedDate = format(dateObj, 'dd-MM-yyy');
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Card className="mt-6 w-96">
        <CardBody className="flex flex-col justify-center items-center py-4 lg:pt-4 pt-8  ">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {numberOfEvents}
          </Typography>
          <Typography>Registered Events</Typography>
        </CardBody>
        <CardBody className="flex flex-col justify-center items-center py-4 lg:pt-4 pt-8  ">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {formattedDate || 'No Upcoming shows'}
          </Typography>
          <Typography>My Next Show</Typography>
        </CardBody>
      </Card>
      
      <div className="flex flex-col">
        {dataPublishedEvents?.data?.length !== 0 ? (
          <PaginationEvents
            userEmail={userEmail}
            userId={userId}
            events={dataPublishedEvents}
            itemsPerPage={6}
            header="Upcoming Events"
            isHome={true}
          />
        ) : (
          <Typography>NO Published Events</Typography>
        )}
      </div>
    </div>
  );
}

export default MusicianHomePage;
