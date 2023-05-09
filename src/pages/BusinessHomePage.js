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
  //get the 3 first events with status assign, date not pass,
  const dataUpcoming = [
    {
      date: '19-6-2023 19:29',
      bandName: 'assadc',
      eventId: '1',
    },
    {
      date: '18-6-2023 19:29',
      bandName: 'assadc',
      eventId: '2',
    },
    {
      date: '16-6-2023 19:29',
      bandName: 'assadc',
      eventId: '3',
    },
  ];
  //get the 3 first events with status published, date not pass,
  const dataAssign = [
    {
      date: '19-6-2023 19:29',
      registered: 2,
      eventId: '1',
    },
    {
      date: '18-6-2023 19:29',
      registered: 5,

      eventId: '2',
    },
    {
      date: '16-6-2023 19:29',
      registered: 3,

      eventId: '3',
    },
  ];
  //get the 3 first events with status assign, date pass(need income)
  const dataIncome = [
    {
      date: '19-6-2023 19:29',
      bandName: 'assadc',
      eventId: '1',
    },
    {
      date: '18-6-2023 19:29',
      bandName: 'assadc',
      eventId: '2',
    },
    {
      date: '16-6-2023 19:29',
      bandName: 'assadc',
      eventId: '3',
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
            data={dataUpcoming}
          />
          <UpcomingEventsInfoCard
            header="Upcoming Event to assign"
            isAssign={false}
            isAssignIncome={true}
            handleClick={getLatestEventToAssign}
            data={dataAssign}
          />
          <UpcomingEventsInfoCard
            header="Events for income updating"
            isAssign={false}
            isAssignIncome={false}
            handleClick={getIncomeUpdating}
            data={dataIncome}
          />
        </div>
      </div>
    </div>
  );
};
export default BusinessHomePage;
