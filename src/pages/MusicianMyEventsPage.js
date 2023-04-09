import React from 'react';
import UpcomingEventMusician from '../components/eventView/UpcomingEventMusician';
import { Typography } from '@material-tailwind/react';

function MusicianMyEventsPage() {
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
      <div className="flex flex-col items-center  mt-10">
        <Typography variant="h2" className="text-center mb-5  ">
          Registered Events
        </Typography>
        <div className="grid lg:grid-rows-1 lg:grid-cols-3 gap-4 sm:grid-cols-1">
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
      <div className="flex flex-col items-center  mt-10">
        <Typography variant="h2" className="text-center mb-5  ">
          Assigned Events
        </Typography>
        <div className="grid lg:grid-rows-1 lg:grid-cols-3 gap-4 sm:grid-cols-1">
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
    </>
  );
}

export default MusicianMyEventsPage;
