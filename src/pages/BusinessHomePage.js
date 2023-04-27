import { FaRegPlusSquare } from 'react-icons/fa';
import { Button, Typography } from '@material-tailwind/react';
import Calendar from '../components/calendar/Calendar';
import UpcomingEventsInfoCard from '../components/cards/UpcomingEventsInfoCard';
const BusinessHomePage = () => {
  const data = [
    {
      header: 'Upcoming Events',
      dates: [
        {
          date: '19-6-2023',
          time: '19:29',
        },
        {
          date: '20-6-2023',
          time: '10:00',
        },
        {
          date: '21-6-2023',
          time: '15:30',
        },
      ],
    },
    {
      header: 'Assign Musician',

      dates: [
        {
          date: '19-6-2023',
          registered: 3,
        },
        {
          date: '20-6-2023',
          registered: 0,
        },
        {
          date: '21-6-2023',
          registered: 5,
        },
      ],
    },
    {
      header: 'Assign Income',
      dates: [
        {
          date: '19-6-2023',
          time: null,
        },
        {
          date: '20-6-2023',
          time: null,
        },
        {
          date: '21-6-2023',
          time: null,
        },
      ],
    },
  ];
  return (
    <>
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row space-x-7">
        <Calendar />
        <div className="flex flex-col space-y-4 lg:flex-col lg:space-y-4 ">
          <UpcomingEventsInfoCard
            header="Upcoming Event"
            isAssign={true}
            isAssignIncome={false}
            data={data[0]}
          />
          <UpcomingEventsInfoCard
            header="Upcoming Event to assign"
            isAssign={false}
            isAssignIncome={true}
            data={data[1]}
          />
          <UpcomingEventsInfoCard
            header="Events for income updating"
            isAssign={false}
            isAssignIncome={false}
            data={data[2]}
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-5 justify-center items-center">
        <Typography variant="h3">Create new Event</Typography>
        <Button>
          <FaRegPlusSquare size={50} />
        </Button>
      </div>
    </>
  );
};
export default BusinessHomePage;
