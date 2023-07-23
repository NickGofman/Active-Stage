import { Card, Typography, CardHeader } from '@material-tailwind/react';
import EventIncome from '../popup/EventIncome';
import AssignMusician from '../popup/AssignMusician';
import { subHours, format, parseISO } from 'date-fns';

const UpcomingEventsInfoCard = ({ isAssign, isAssignIncome, data }) => {
  const upcomingEvents = data?.slice(0, 3);// Get the first three events
  

  return (
    <>
      {isAssign ? (
        <Card className="shadow-lg hover:shadow-cyan-300 shadow-cyan-200 space-y-6 p-6 text-center flex-1 min-h-48">
          <CardHeader>
            <Typography variant="paragraph" color="light-blue">
              Upcoming Events
            </Typography>
          </CardHeader>

          {upcomingEvents?.map(({ Date, EventID }) => {
            const eventDate = parseISO(Date);
            const threeHoursBehindDate = subHours(eventDate, 3);

            return (
              <div
                key={EventID}
                className="flex justify-center space-x-6 hover:bg-cyan-50 rounded-xl cursor-pointer"
              >
                <Typography variant="paragraph">
                  <time dateTime={Date}>
                    {format(threeHoursBehindDate, 'HH:mm dd/MM/yyyy')}
                  </time>
                </Typography>
              </div>
            );
          })}
          {upcomingEvents?.length === 0 && (
            <div className="flex justify-center space-x-6 hover:bg-cyan-50 rounded-xl cursor-pointer">
              <Typography variant="paragraph">No upcoming events</Typography>
            </div>
          )}
        </Card>
      ) : isAssignIncome ? (
        <Card className="shadow-lg hover:shadow-green-300 shadow-green-200 space-y-6 p-6 text-center flex-2 min-h-48">
          <CardHeader>
            <Typography variant="paragraph" color="green">
              Assign Musician
            </Typography>
          </CardHeader>
          {data?.map(({ EventID, Date, RCount }) => (
            <div
              key={EventID}
              className="flex justify-center space-x-6 hover:bg-light-green-50 rounded-xl cursor-pointer"
            >
              <Typography variant="paragraph">{Date.slice(0, 10)}</Typography>
              <Typography variant="paragraph">Registered: {RCount}</Typography>
              <AssignMusician
                EventId={EventID}
                EventDate={Date}
                disabled={true}
              />
            </div>
          ))}
          {data?.length === 0 && (
            <div className="flex justify-center space-x-6 hover:bg-light-green-50 rounded-xl cursor-pointer">
              <Typography variant="paragraph">
                No events to assign musicians
              </Typography>
            </div>
          )}
        </Card>
      ) : (
        <Card className="shadow-lg shadow-deep-orange-200 hover:shadow-deep-orange-300 space-y-6 p-6 text-center flex-1 min-h-48">
          <CardHeader>
            <Typography variant="paragraph" color="red">
              Assign Income
            </Typography>
          </CardHeader>
          {data?.map(({ Date, EventID, BandName }) => (
            <div
              key={EventID}
              className="flex justify-center space-x-6 hover:bg-red-50 rounded-xl cursor-pointer"
            >
              <EventIncome
                EventId={EventID}
                bandName={BandName}
                EventDate={Date.slice(0, 10)}
                disabled={true}
              />
              <Typography variant="paragraph">{Date.slice(0, 10)}</Typography>
            </div>
          ))}
          {data?.length === 0 && (
            <div className="flex justify-center space-x-6 hover:bg-red-50 rounded-xl cursor-pointer">
              <Typography variant="paragraph">
                No events to assign income
              </Typography>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default UpcomingEventsInfoCard;
