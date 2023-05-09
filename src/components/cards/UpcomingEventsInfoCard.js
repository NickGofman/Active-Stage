import { Card, Typography, CardHeader } from '@material-tailwind/react';
import EventIncome from '../popup/EventIncome';
import AssignMusician from '../popup/AssignMusician';
const UpcomingEventsInfoCard = ({
  isAssign,
  isAssignIncome,
  handleClick,
  data,
}) => {
  return (
    <>
      {isAssign ? (
        <Card
          className=" shadow-lg 
        hover:shadow-cyan-300
        shadow-cyan-200 space-y-6 p-6  text-center flex-1 "
        >
          <CardHeader>
            <Typography variant="paragraph" color="light-blue">
              Upcoming Events
            </Typography>
          </CardHeader>
          {data.map(({ date, eventId }) => (
            <div
              key={eventId}
              className="flex justify-center space-x-6 hover:bg-red-50 rounded-xl cursor-pointer "
            >
              <Typography variant="paragraph">{date}</Typography>
            </div>
          ))}
        </Card>
      ) : isAssignIncome ? (
        <Card className=" shadow-lg hover:shadow-green-300  shadow-green-200 space-y-6 p-6 text-center flex-2 ">
          <CardHeader>
            <Typography variant="paragraph" color="green">
              Assign Musician
            </Typography>
          </CardHeader>
          {data.map(({ date, registered, eventId }) => (
            <div
              key={eventId}
              className="flex justify-center space-x-6 hover:bg-light-green-50 rounded-xl cursor-pointer"
              onClick={handleClick}
            >
              <Typography variant="paragraph">{date}</Typography>
              <Typography variant="paragraph">
                Registered: {registered}
              </Typography>
              <AssignMusician
                EventId={eventId}
                EventDate={date}
                disabled={true}
              />
            </div>
          ))}
        </Card>
      ) : (
        <Card
          className="shadow-lg shadow-deep-orange-200
        hover:shadow-deep-orange-300 space-y-6 p-6 text-center flex-1 "
        >
          <CardHeader>
            <Typography variant="paragraph" color="red">
              Assign Income
            </Typography>
          </CardHeader>
          {data.map(({ date, bandName, eventId }) => (
            <div
              key={eventId}
              className="flex justify-center space-x-6 hover:bg-red-50 rounded-xl cursor-pointer "
            >
              <EventIncome
                EventId={eventId}
                bandName={bandName}
                EventDate={date}
                disabled={true}
              />
              <Typography variant="paragraph">{date}</Typography>
            </div>
          ))}
        </Card>
      )}
    </>
  );
};
export default UpcomingEventsInfoCard;
