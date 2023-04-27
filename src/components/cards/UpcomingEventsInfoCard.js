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
        <Card
          className=" shadow-lg 
        hover:shadow-cyan-300
        shadow-cyan-200 space-y-6 p-6  text-center flex-1 "
        >
          <CardHeader>
            <Typography variant="paragraph" color="light-blue">
              {header}
            </Typography>
          </CardHeader>
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex justify-center space-x-6 hover:bg-light-blue-50 rounded-xl cursor-pointer "
              onClick={handleClick}
            >
              <Typography variant="paragraph">{date.date}</Typography>
              <Typography variant="paragraph">{date.time}</Typography>
            </div>
          ))}{' '}
        </Card>
      ) : isAssignIncome ? (
        <Card className=" shadow-lg hover:shadow-green-300  shadow-green-200 space-y-6 p-6 text-center flex-2 ">
          <CardHeader>
            <Typography variant="paragraph" color="green">
              {header}
            </Typography>
          </CardHeader>
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex justify-center space-x-6 hover:bg-light-green-50 rounded-xl cursor-pointer"
              onClick={handleClick}
            >
              <Typography variant="paragraph">{date.date}</Typography>
              <Typography variant="paragraph">
                Registered: {date.registered}
              </Typography>
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
              {header}
            </Typography>
          </CardHeader>
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex justify-center space-x-6 hover:bg-red-50 rounded-xl cursor-pointer "
              onClick={handleClick}
            >
              <Typography variant="paragraph">{date.date}</Typography>
            </div>
          ))}
        </Card>
      )}
    </>
  );
};
export default UpcomingEventsInfoCard;
