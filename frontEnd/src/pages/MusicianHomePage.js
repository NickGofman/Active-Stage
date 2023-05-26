import React from 'react';
import PaginationEvents from '../components/pagination/PaginationEvents';
import { Card, Typography, CardBody } from '@material-tailwind/react';
import { useAllPublishedEvents } from '../hooks/useMusicianEvnets';
import { useLocation } from 'react-router-dom';
function MusicianHomePage() {
  const userId = parseInt(useLocation().key.split('/'));
  console.log('userId:', userId);
  const { isLoading, data, isError, error } = useAllPublishedEvents(userId);
  // make sure the musician is'nt already registered to the current event,

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  const numberOfEvents = 0;
  const nextEventDate = '25/05/2023';

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
            {nextEventDate}
          </Typography>
          <Typography>My Next Show</Typography>
        </CardBody>
      </Card>
      <div>
        <PaginationEvents
          events={data}
          itemsPerPage={6}
          header="Upcoming Events"
          isHome={true}
        />
      </div>
    </div>
  );
}

export default MusicianHomePage;
