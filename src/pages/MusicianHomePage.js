import React from 'react';
import { Typography } from '@material-tailwind/react';
import UpcomingEventMusician from '../components/eventView/UpcomingEventMusician';
function MusicianHomePage() {
  const numberOfEvents = 0;
  // const date = new Date();

  return (
    <>
      <div>
        <div className="flex flex-row justify-center space-x-10  ">
          <div className="flex flex-col max-w-xs items-center space-y-3">
            <Typography variant="h4">Registered Events</Typography>
            <Typography variant="lead">{numberOfEvents}</Typography>
          </div>
          <div className="flex flex-col items-center mb-5 max-w-xs  space-y-3">
            <Typography variant="h4">My Next Show</Typography>
            <Typography variant="lead">2013 05 26</Typography>
          </div>
        </div>
        <h2>сфдгсйсдфйкфдшйк</h2>
        
        <UpcomingEventMusician />
      </div>
    </>
  );
}

export default MusicianHomePage;
