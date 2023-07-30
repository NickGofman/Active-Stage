import React from 'react';
import PaginationEvents from '../components/pagination/PaginationEvents';
import { Card, Typography, CardBody } from '@material-tailwind/react';
import {
  useAllAssignedEvents,
  useAllPreviousEvents,
  useAllPublishedEvents,
  useAllRegisteredEvents,
} from '../hooks/useMusicianEvents';
import { format, subHours } from 'date-fns';
import Loader from '../components/loader/Loader';
function MusicianHomePage() {
  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.UserId : null;
  const userEmail = user ? user.Email : null;

  // Fetch data for upcoming events that have been published
  const {
    isLoading: isLoadingPublishedEvents,
    data: dataPublishedEvents,
    isError: isErrorPublishedEvents,
  } = useAllPublishedEvents(userId);

  // Fetch data for events the musician has registered for
  const {
    isLoading: isLoadingRegisteredEvents,
    data: dataRegisteredEvents,
    error: errorRegisteredEvents,
  } = useAllRegisteredEvents(userId);

  // Fetch data for all events assigned to the musician
  const {
    isLoading: isLoadingAllAssigned,
    data: dataAllAssigned,
    isError: isErrorAllAssigned,
  } = useAllAssignedEvents(userId);

  // Fetch data for the musician's previous events
  const {
    isLoading: isLoadingPreviousEvents,
    data: dataPreviousEvents,
    isError: isErrorPreviousEvents,
  } = useAllPreviousEvents(userId);
  if (
    isLoadingPublishedEvents ||
    isLoadingRegisteredEvents ||
    isLoadingAllAssigned ||
    isLoadingPreviousEvents
  ) {
    return <Loader />;
  }

  if (
    isErrorPublishedEvents ||
    errorRegisteredEvents ||
    isErrorAllAssigned ||
    isErrorPreviousEvents
  ) {
    return <div>ERROR</div>;
  }

  // Get the number of registered events
  const numberOfEvents = dataRegisteredEvents?.data?.length;

  // Get the date of the next assigned event
  const nextEventDate = dataAllAssigned?.data[0]?.Date.split('T')[0];
  let formattedDate = '';
  if (nextEventDate !== undefined) {
    let dateObj = new Date(nextEventDate);
    dateObj = subHours(dateObj, 3);
    formattedDate = format(dateObj, 'dd-MM-yyy');
  }

  return (
    <div
      className={`flex lg:flex-row justify-evenly  ${
        dataPublishedEvents?.data?.length !== 0 ? 'items-start' : 'items-center'
      }  flex-col`}
    >
      <div className="flex flex-col justify-center items-center lg:ml-5">
        <div className="flex flex-col justify-center items-center">
          {/* Display upcoming published events using the PaginationEvents component */}
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
            <Typography className="font-semibold mt-5 lg:mt-0">
              NO Published Events
            </Typography>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:mr-5 ">
        <Card className="mt-6 w-96 dark:bg-black dark:text-white ">
          <CardBody className="flex flex-col justify-center items-center py-4 lg:pt-4 pt-8  ">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 dark:text-white "
            >
              {numberOfEvents}
            </Typography>
            <Typography>Registered Events</Typography>
          </CardBody>
          <CardBody className="flex flex-col justify-center items-center py-4 lg:pt-4 pt-8  ">
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 dark:text-white"
            >
              {formattedDate || 'No Upcoming shows'}
            </Typography>
            <Typography>My Next Show</Typography>
          </CardBody>
        </Card>
        <Card className=" mt-6 w-96 dark:text-white dark:bg-black">
          {dataPreviousEvents?.data?.length !== 0 ? (
            <div>
              {/* Display a message when the musician has no previous events */}
              <Typography className="text-xl  mb-2 font-semibold">
                My Previous Shows
              </Typography>
              <div className=" h-96 overflow-scroll{ overflow-x-hidden border rounded ">
                {dataPreviousEvents?.data?.map(
                  ({ EventID, musicalTypeName, Date: date }) => {
                    date = new Date(date);
                    date = format(date, 'dd-MM-yyyy HH:mm');

                    return (
                      <div
                        key={EventID}
                        className="bg-white shadow-md rounded-md p-4 mb-4 w-96  dark:bg-black "
                      >
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="mb-1 dark:text-white"
                        >
                          {musicalTypeName}
                        </Typography>
                        <Typography>{date}</Typography>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            <div>
              <Typography className="text-xl font-medium mb-2 p-2">
                No previous Events
              </Typography>
              <Typography className="mx-auto max-w-md font-semibold p-2">
                Keep the rhythm of progress alive by registering and engaging
                with petitions. Our platform fuels your artistic journey,
                uniting your passion with purpose. With each petition, your
                voice gains momentum, paving the way for thrilling events.
                Together, we compose a symphony of change, empowering musicians
                like you to claim center stage and make a resounding impact.
                Embrace the power of unity, and let your talents resonate far
                and wide
              </Typography>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default MusicianHomePage;
