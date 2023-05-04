import { Button, Typography } from '@material-tailwind/react';
import Calendar from '../components/calendar/Calendar';
import UpcomingEventsInfoCard from '../components/cards/UpcomingEventsInfoCard';
import CreateNewEvent from '../components/popup/CreateNewEvent';
const BusinessHomePage = () => {
  // create function for handelClick for all 3 use cases
  // get the upcoming event
  const getLatestUpcomingEvent = (evetID) => {};
  // get the  EventToAssign
  const getLatestEventToAssign = (evetID) => {};
  // get Events that need to assign Income
  const getIncomeUpdating = (evetID) => {};

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
    <div className=" flex flex-grow px-5 py-24 mx-auto flex-col justify-center items-center ">
      <div className="flex flex-col space-y-4  lg:space-y-0 lg:flex-row space-x-2">
        <Calendar />
        <div className="lg:flex lg:flex-col space-y-4  lg:space-y-4 md:grid md:grid-cols-2 md:gap-3 justify-center ">
          <CreateNewEvent />
          <UpcomingEventsInfoCard
            header="Upcoming Event"
            isAssign={true}
            isAssignIncome={false}
            handleClick={getLatestUpcomingEvent}
            data={data[0]}
          />
          <UpcomingEventsInfoCard
            header="Upcoming Event to assign"
            isAssign={false}
            isAssignIncome={true}
            handleClick={getLatestEventToAssign}
            data={data[1]}
          />
          <UpcomingEventsInfoCard
            header="Events for income updating"
            isAssign={false}
            isAssignIncome={false}
            handleClick={getIncomeUpdating}
            data={data[2]}
          />
        </div>
      </div>
    </div>
  );
};
export default BusinessHomePage;
