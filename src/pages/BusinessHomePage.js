import UpcomingEventsInfoCard from "../components/cards/UpcomingEventsInfoCard";
const BusinessHomePage = () => {
  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
      <UpcomingEventsInfoCard />
      <UpcomingEventsInfoCard />
      <UpcomingEventsInfoCard />
    </div>
  );
};
export default BusinessHomePage;
