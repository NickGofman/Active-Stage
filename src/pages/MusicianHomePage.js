import React from 'react';
import PaginationEvents from '../components/pagination/PaginationEvents';
import { Typography } from '@material-tailwind/react';
function MusicianHomePage() {
  const numberOfEvents = 0;
  // const date = new Date();
  const events = [
    {
      id: 1,
      date: '2023-04-12',
      hour: '19:00',
      type: 'Rock',
      description: 'Live concert featuring popular rock bands.',
    },
    {
      id: 2,
      date: '2023-04-15',
      hour: '20:30',
      type: 'Jazz',
      description:
        'An evening of smooth jazz music performed by renowned jazz artists.',
    },
    {
      id: 3,
      date: '2023-04-18',
      hour: '18:00',
      type: 'Classical',
      description: 'Orchestra performance of classical music masterpieces.',
    },
    {
      id: 4,
      date: '2023-04-21',
      hour: '22:00',
      type: 'EDM',
      description:
        'Electronic Dance Music (EDM) party with top DJs and dazzling visual effects.',
    },
    {
      id: 5,
      date: '2023-04-25',
      hour: '17:30',
      type: 'Folk',
      description:
        'A celebration of folk music from different cultures with live performances and cultural activities.',
    },
    {
      id: 6,
      date: '2023-04-28',
      hour: '21:00',
      type: 'Hip Hop',
      description:
        'Hip Hop night featuring rap battles, dance performances, and live DJ sets.',
    },
    {
      id: 7,
      date: '2023-05-01',
      hour: '20:00',
      type: 'Pop',
      description:
        'Concert showcasing the latest pop hits performed by popular artists.',
    },
    {
      id: 8,
      date: '2023-05-05',
      hour: '19:30',
      type: 'Latin',
      description:
        'A vibrant celebration of Latin music and dance with live performances and cultural activities.',
    },
    {
      id: 9,
      date: '2023-05-09',
      hour: '18:30',
      type: 'Reggae',
      description:
        'Groove to the rhythm of reggae music with live bands and Caribbean-inspired vibes.',
    },
    {
      id: 10,
      date: '2023-05-13',
      hour: '16:00',
      type: 'Country',
      description:
        'Country music festival featuring live performances, line dancing, and western-themed activities.',
    },
    {
      id: 11,
      date: '2023-05-16',
      hour: '17:00',
      type: 'World',
      description:
        'Experience the rich diversity of world music with performances from different cultures and genres.',
    },
    {
      id: 12,
      date: '2023-05-20',
      hour: '19:30',
      type: 'Indie',
      description:
        'Intimate concert featuring indie bands and acoustic performances in a cozy setting.',
    },
  ];

  return (
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
          <PaginationEvents events={events} itemsPerPage={6} header="Upcoming Events" isHome={true}/>
    </div>
  );
}

export default MusicianHomePage;
