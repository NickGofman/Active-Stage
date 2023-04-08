import React from 'react';
import { Button, Typography } from '@material-tailwind/react';

function UpcomingEventMusician() {
  return (
    <div className="py-8 flex flex-wrap  max-w-md rounded-md border-2  ">
      <div className="flex flex-col">
        <Typography variant="paragraph">Date: 12 Jun 2019</Typography>
        <Typography variant="paragraph">Hour: 22:00</Typography>
        <Typography variant="paragraph">Type: Jazz</Typography>

        <Typography variant="paragraph">
          Glossier echo park pug, church-key sartorial biodiesel vexillologist
          pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag
          selfies, poke vaporware kombucha lumbersexual pork belly polaroid
          hoodie portland craft beer.
        </Typography>
        <Button variant="outlined" size="sm" className="max-w-sm">
          Register
        </Button>
      </div>
    </div>
  );
}

export default UpcomingEventMusician;
