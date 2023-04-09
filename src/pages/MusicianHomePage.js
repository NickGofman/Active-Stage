import React from 'react';
import { Typography } from '@material-tailwind/react';
import UpcomingEventMusician from '../components/eventView/UpcomingEventMusician';
function MusicianHomePage() {
  const numberOfEvents = 0;
  // const date = new Date();
  const events = [
    {
      id: 1,
      date: '2023-05-01',
      hour: '22:00',
      type: 'Spring Festival',
      description:
        'Join us for our annual Spring Festival with live music, food trucks, and activities for the whole family.',
    },
    {
      id: 2,
      date: '2023-06-15',
      hour: '22:00',
      type: 'Jazz Night',
      description:
        'Enjoy an evening of live jazz music and cocktails at our rooftop lounge.',
    },
    {
      id: 3,
      date: '2023-07-04',
      hour: '22:00',
      type: 'Independence Day Celebration',
      description:
        "Celebrate America's independence with fireworks, live music, and food vendors.",
    },
    {
      id: 4,
      date: '2023-08-21',
      hour: '22:00',
      type: 'Solar Eclipse Viewing Party',
      description:
        'Join us for a once-in-a-lifetime event as we watch the solar eclipse together with special telescopes and glasses.',
    },
    {
      id: 5,
      date: '2023-09-10',
      hour: '22:00',
      type: 'Charity Walk',
      description:
        'Participate in our annual charity walk to raise funds for local non-profit organizations.',
    },
    {
      id: 6,
      date: '2023-11-25',
      hour: '22:00',
      type: 'Holiday Market',
      description:
        'Get in the holiday spirit and shop for unique gifts at our outdoor market featuring local artisans and vendors.',
    },
  ];

  return (
    <>
      <div>
        <div className="flex justify-center py-4 lg:pt-4 pt-8  ">
          <div className=" p-3 text-center   border-r-2">
            <span className="text-2xl font-bold block uppercase tracking-wide text-gray-700 ">
              {numberOfEvents}
            </span>
            <span className="text-md text-gray-500">Registered Events</span>
          </div>

          <div className="p-3 text-center  ">
            <span className="text-2xl  font-bold block uppercase tracking-wide text-gray-700">
              26/12/2023
            </span>
            <span className="text-md text-gray-500">My Next Show</span>
          </div>
        </div>
        {/* <div className="flex flex-row justify-center  space-x-10 mb-5">
          <div className="flex flex-col max-w-xs items-center space-y-3 ">
            <Typography
              className="	border-b-2 border-b-light-blue-300 "
              variant="h4"
            >
              Registered Events
            </Typography>
            <Typography variant="lead">{numberOfEvents}</Typography>
          </div>
          <div className="flex flex-col items-center mb-5 max-w-xs  space-y-3">
            <Typography
              className="	border-b-2 border-b-light-blue-300"
              variant="h4"
            >
              My Next Show
            </Typography>
            <Typography variant="lead">2013 05 26</Typography>
          </div>
        </div> */}
        <div className="flex flex-col items-center  mt-10">
          <Typography variant="h2" className="text-center mb-5  ">
            Upcoming Events
          </Typography>
          <div className="grid lg:grid-rows-2 lg:grid-cols-3 gap-4 sm:grid-cols-1">
            {events.map((event) => (
              <UpcomingEventMusician
                key={event.id}
                date={event.date}
                hour={event.hour}
                type={event.type}
                description={event.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicianHomePage;
