import { Card, Typography,CardHeader} from '@material-tailwind/react';
const BusinessHomePage = () => {
  return (
    <Card className="space-y-6 p-6">
      <CardHeader  >
        <Typography color='blue'>
          Upcoming Event
        </Typography>
      </CardHeader>
      <div className="flex space-x-6 ">
        <Typography variant="paragraph">19-6-2023</Typography>
        <Typography variant="paragraph">19:29</Typography>
      </div>
      <div className="flex space-x-6 ">
        <Typography variant="paragraph">19-6-2023</Typography>
        <Typography variant="paragraph">19:29</Typography>
      </div>
      <div className="flex space-x-6 ">
        <Typography variant="paragraph">19-6-2023</Typography>
        <Typography variant="paragraph">19:29</Typography>
      </div>
    </Card>
  );
};
export default BusinessHomePage;
