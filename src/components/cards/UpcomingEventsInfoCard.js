import { Card, Typography, CardHeader } from '@material-tailwind/react';
const UpcomingEventsInfoCard = ({
  header,
  isAssign,
  isAssignIncome,
  handleClick,
}) => {
  return (
    <>
      {isAssign ? (
        <Card className=" space-y-6 p-6 ">
          <CardHeader>
            <Typography variant="h5" color="light-blue">
              {header}
            </Typography>
          </CardHeader>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="h5">19-6-2023</Typography>
            <Typography variant="h5">19:29</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="h5">19-6-2023</Typography>
            <Typography variant="h5">19:29</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="h5">19-6-2023</Typography>
            <Typography variant="h5">19:29</Typography>
          </div>
        </Card>
      ) : isAssignIncome ? (
        <Card className=" space-y-6 p-6  ">
          <CardHeader>
            <Typography variant="h5" color="light-blue">
              {header}
            </Typography>
          </CardHeader>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="h5">19-6-2023</Typography>
            <Typography variant="h5">Registered: 3</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="h5">19-6-2023</Typography>
            <Typography variant="h5">Registered: 0</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="h5">19-6-2023</Typography>
            <Typography variant="h5">Registered: 5</Typography>
          </div>
        </Card>
      ) : (
        <Card className=" space-y-6 p-6">
          <CardHeader>
            <Typography variant="h5" color="red">
              {header}
            </Typography>
          </CardHeader>
          <div className="flex justify-center  ">
            <Typography variant="h5">19-6-2023</Typography>
          </div>
          <div className="flex justify-center ">
            <Typography variant="h5">19-6-2023</Typography>
          </div>
          <div className="flex justify-center  ">
            <Typography variant="h5">19-6-2023</Typography>
          </div>
        </Card>
      )}
    </>
  );
};
export default UpcomingEventsInfoCard;
