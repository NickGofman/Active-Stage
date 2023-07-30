import Calendar from '../components/calendar/Calendar';
import UpcomingEventsInfoCard from '../components/cards/UpcomingEventsInfoCard';
import Loader from '../components/loader/Loader';
import CreateNewEvent from '../components/popup/CreateNewEvent';
import {
  useGetEventsPassedWithoutIncome,
  useGetThreeEventsToAssign,
  useGetEventsForCalendar,
  useGetThreeUpcomingEvents,
} from '../hooks/useAdminEvents';
const BusinessHomePage = () => {
  // Fetch data for upcoming events to assign custom hook
  const { data: dataAssign, isError, isLoading } = useGetThreeEventsToAssign();

  // Fetch data for events passed without income custom hook
  const {
    data: dataIncome,
    isError: isErrorIncome,
    isLoading: isLoadingIncome,
  } = useGetEventsPassedWithoutIncome();

  // Fetch data for events to display on the calendar custom hook
  const {
    data: dataEvents,
    isError: isErrorEvents,
    isLoading: isLoadingEvents,
  } = useGetEventsForCalendar();

  // Fetch data for the next three upcoming events custom hook
  const {
    data: dataThreeUpcomingEvent,
    isError: isErrorThreeUpcomingEvent,
    isLoading: isLoadingThreeUpcomingEvent,
  } = useGetThreeUpcomingEvents();

  if (
    isLoading ||
    isLoadingIncome ||
    isLoadingEvents ||
    isLoadingThreeUpcomingEvent
  ) {
    return <Loader />;
  }
  if (isError || isErrorIncome || isErrorEvents || isErrorThreeUpcomingEvent) {
    return <div>Error</div>;
  }
  // console.log('dataAssign', dataAssign);
  return (
    <div className=" flex flex-grow px-5 py-24 pt-0 mx-auto flex-col justify-center items-center mt-10 ">
      <div className="flex flex-col space-y-4  lg:space-y-0 lg:flex-row space-x-2">
        <Calendar data={dataEvents?.data} />
        <div className="lg:flex lg:flex-col space-y-4  lg:space-y-4 md:grid md:grid-cols-2 md:gap-3 justify-center ">
          <CreateNewEvent />
          <UpcomingEventsInfoCard
            header="Events for income updating"
            isAssign={false}
            isAssignIncome={false}
            data={dataIncome?.data}
          />

          <UpcomingEventsInfoCard
            header="Upcoming Event to assign"
            isAssign={false}
            isAssignIncome={true}
            data={dataAssign?.data}
          />
          <UpcomingEventsInfoCard
            header="Upcoming Event"
            isAssign={true}
            isAssignIncome={false}
            data={dataThreeUpcomingEvent?.data}
          />
        </div>
      </div>
    </div>
  );
};
export default BusinessHomePage;
