import { Card, Typography, CardHeader } from '@material-tailwind/react';
const UpcomingEventsInfoCard = ({ header, isAssign, handleClick }) => {
  return (
    <>
      {isAssign ? (
        <Card className=" space-y-6 p-6">
          <CardHeader>
            <Typography variant="h4" color="blue">
              Upcoming Event
            </Typography>
          </CardHeader>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="paragraph">19-6-2023</Typography>
            <Typography variant="paragraph">19:29</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="paragraph">19-6-2023</Typography>
            <Typography variant="paragraph">19:29</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="paragraph">19-6-2023</Typography>
            <Typography variant="paragraph">19:29</Typography>
          </div>
        </Card>
      ) : (
        <Card className=" space-y-6 p-6">
          <CardHeader>
            <Typography variant="h4" color="blue">
              Upcoming Event
            </Typography>
          </CardHeader>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="paragraph">19-6-2023</Typography>
            <Typography variant="paragraph">19:29</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="paragraph">19-6-2023</Typography>
            <Typography variant="paragraph">19:29</Typography>
          </div>
          <div className="flex justify-center space-x-6 ">
            <Typography variant="paragraph">19-6-2023</Typography>
            <Typography variant="paragraph">19:29</Typography>
          </div>
        </Card>
      )}
    </>
  );
};
export default UpcomingEventsInfoCard;
