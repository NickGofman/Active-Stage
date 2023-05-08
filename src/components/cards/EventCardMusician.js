import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
function EventCardMusician(props) {
  const { date, hour, type, description } = props;
  const location = useLocation();
  return (
    <div className="flex flex-col items-center space-y-3 text-center text-gray-700 rounded-md border-2 py-8 max-w-sm">
      <Typography className="mt-1  text-s" variant="h3">
        {date}
      </Typography>
      <Typography variant="h3">{hour}</Typography>
      <Typography variant="h4">{type}</Typography>

      <Typography className="text-center " variant="paragraph">
        {description}
      </Typography>
      {location.pathname !== '/myevents' && (
        <Button variant="outlined" size="sm" className="max-w-sm">
          Register
        </Button>
      )}
    </div>
  );
}

export default EventCardMusician;
