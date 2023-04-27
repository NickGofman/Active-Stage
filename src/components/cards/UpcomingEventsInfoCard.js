import { Card, Typography, CardHeader } from '@material-tailwind/react';
const UpcomingEventsInfoCard = ({
  isAssign,
  isAssignIncome,
  handleClick,
  data,
}) => {
  const { header, dates } = data;
  return (
    <>
      {isAssign ? (
        <Card className=" space-y-6 p-6  text-center flex-1 ">
          <CardHeader>
            <Typography variant="h5" color="light-blue">
              {header}
            </Typography>
          </CardHeader>
          {dates.map((date, index) => (
            <div key={index} className="flex justify-center space-x-6  ">
              <Typography variant="h5">{date.date}</Typography>
              <Typography variant="h5">{date.time}</Typography>
            </div>
          ))}
        </Card>
      ) : isAssignIncome ? (
        <Card className=" space-y-6 p-6 text-center flex-2 ">
          <CardHeader>
            <Typography variant="h5" color="light-blue">
              {header}
            </Typography>
          </CardHeader>
          {dates.map((date, index) => (
            <div key={index} className="flex justify-center space-x-6 ">
              <Typography variant="h5">{date.date}</Typography>
              <Typography variant="h5">
                Registered: {date.registered}
              </Typography>
            </div>
          ))}
        </Card>
      ) : (
        <Card className=" space-y-6 p-6 text-center flex-1 ">
          <CardHeader>
            <Typography variant="h5" color="red">
              {header}
            </Typography>
          </CardHeader>
          {dates.map((date, index) => (
            <div key={index} className="flex justify-center space-x-6  ">
              <Typography variant="h5">{date.date}</Typography>
            </div>
          ))}
        </Card>
      )}
    </>
  );
};
export default UpcomingEventsInfoCard;
