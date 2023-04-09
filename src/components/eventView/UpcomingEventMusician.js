import React from 'react';
import { Button, Typography } from '@material-tailwind/react';

function UpcomingEventMusician(props) {
  const { date, hour, type, description } = props;
  return (
    <div className="py-8 flex flex-wrap  max-w-sm rounded-md border-2  ">
      <div
        className="flex flex-col items-center space-y-3 text-gray-700"
      >
        <Typography className="mt-1  text-s" variant="h3">
          {date}
        </Typography>
        <Typography variant="h3">{hour}</Typography>
        <Typography variant="h4">{type}</Typography>

        <Typography className="text-center " variant="paragraph">
          {description}
        </Typography>
        <Button variant="outlined" size="sm" className="max-w-sm">
          Register
        </Button>
      </div>
    </div>
  );
}

export default UpcomingEventMusician;
