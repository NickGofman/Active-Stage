import { Card, Typography, CardHeader } from '@material-tailwind/react';
import EventIncome from '../popup/EventIncome';
import AssignMusician from '../popup/AssignMusician';
import { subHours, format, parseISO, addHours } from 'date-fns';

const UpcomingEventsInfoCard = ({ isAssign, isAssignIncome, data }) => {
  const upcomingEvents = data?.filter(({ Status }) => Status === 'Assigned').slice(0,3);//get the three assigned events

  return (
    <>
      {isAssign ? (
        <Card className="shadow-lg hover:shadow-cyan-300 shadow-cyan-200 space-y-6 p-6 text-center flex-1 min-h-48">
          <CardHeader>
            <Typography variant="paragraph" color="light-blue">
              Upcoming Events
            </Typography>
          </CardHeader>

          {upcomingEvents?.map(({ Date, EventID,Status }) => {
            const eventDate = parseISO(Date);
            const threeHoursBehindDate = subHours(eventDate, 3);

            return (
              Status!=='Published'&&<div
                key={EventID}
                className="flex justify-center space-x-6  rounded-xl cursor-pointer"
              >
                <Typography variant="paragraph">
                  <time dateTime={Date}>
                    {format(threeHoursBehindDate, 'dd-MM-yyyy HH:mm')}
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
          {data?.map(({ EventID, Date: date, RCount }) => {
            
            return (
              <div
                key={EventID}
                className="flex justify-center space-x-6 rounded-xl "
              >
                <Typography variant="paragraph">
                  {format(new Date(date), 'dd-MM-yyyy')}
                </Typography>
                <Typography variant="paragraph">
                  Registered: {RCount}
                </Typography>
                <AssignMusician
                  EventId={EventID}
                  // EventDate={date}
                  EventDate={addHours(new Date(date), 3)}
                  disabled={true}
                />
              </div>
            );
          })}
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
          {data?.map(({ Date: date, EventID, BandName }) => {
            return (
              <div
                key={EventID}
                className="flex justify-center space-x-6  rounded-xl "
              >
                <EventIncome
                  EventId={EventID}
                  bandName={BandName}
                  EventDate={date}
                  disabled={true}
                />
                <Typography variant="paragraph">
                  {format(new Date(date.slice(0, 10)), 'dd-MM-yyyy')}
                </Typography>
              </div>
            );
          })}
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
