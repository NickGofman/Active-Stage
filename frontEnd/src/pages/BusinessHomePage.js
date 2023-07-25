import Calendar from '../components/calendar/Calendar';
import UpcomingEventsInfoCard from '../components/cards/UpcomingEventsInfoCard';
import Loader from '../components/loader/Loader';
import CreateNewEvent from '../components/popup/CreateNewEvent';
import {
  useGetEventsPassedWithoutIncome,
  useGetThreeEventsToAssign,
  useGetUpcomingEvents,
} from '../hooks/useAdminEvents';
const BusinessHomePage = () => {
  const {
    data: dataAssign,
    error,
    isError,
    isLoading,
  } = useGetThreeEventsToAssign();
  
  const {
    error: errorIncome,
    data: dataIncome,
    isError: isErrorIncome,
    isLoading: isLoadingIncome,
  } = useGetEventsPassedWithoutIncome();
  const {
    error: errorUpcoming,
    data: dataUpcoming,
    isError: isErrorUpcoming,
    isLoading: isLoadingUpcoming,
  } = useGetUpcomingEvents();

  if (isLoading || isLoadingIncome || isLoadingUpcoming) {
    return <Loader/>;
  }
  if (isError || isErrorIncome || isErrorUpcoming) {
    return <div>{error}</div>;
  }

  return (
    <div className=" flex flex-grow px-5 py-24 pt-0 mx-auto flex-col justify-center items-center ">
      <div className="flex flex-col space-y-4  lg:space-y-0 lg:flex-row space-x-2">
        <Calendar data= {dataUpcoming?.data}/>
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
            data={dataUpcoming?.data}
          />
        </div>
      </div>
    </div>
  );
};
export default BusinessHomePage;
