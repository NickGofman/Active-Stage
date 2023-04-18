import { FaRegPlusSquare } from 'react-icons/fa';
import { Button, Typography } from '@material-tailwind/react';
import Calendar from '../components/calendar/Calendar';
import UpcomingEventsInfoCard from '../components/cards/UpcomingEventsInfoCard';
const BusinessHomePage = () => {
  return (
    <>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
        <UpcomingEventsInfoCard
          header="Upcoming Event"
          isAssign={true}
          isAssignIncome={false}
        />
        <UpcomingEventsInfoCard
          header="Upcoming Event to assign"
          isAssign={false}
          isAssignIncome={true}
        />
        <UpcomingEventsInfoCard
          header="Events for income updating"
          isAssign={false}
          isAssignIncome={false}
        />
      </div>
      <div className="flex space-x-4 mt-5 ">
        <Typography>Create new Event</Typography>
        <Button>
          <FaRegPlusSquare size={100} />
        </Button>
        <Calendar />
      </div>
    </>
  );
};
export default BusinessHomePage;
