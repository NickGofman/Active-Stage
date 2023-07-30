import React, { useContext } from 'react';

import PaginationEvents from '../components/pagination/PaginationEvents';
import {
  useAllAssignedEvents,
  useAllRegisteredEvents,
} from '../hooks/useMusicianEvents';
import { AuthContext } from '../components/context/authContext';
import Loader from '../components/loader/Loader';
function MusicianMyEventsPage() {
  // Get the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.UserId : null;

  // Fetch data for events the musician has registered for - custom hook
  const {
    isLoadingRegisteredEvents,
    dataRegisteredEvents,
    isErrorRegisteredEvents,
  } = useAllRegisteredEvents(userId);

  // Fetch data for all events assigned to the musician - custom hook
  const {
    isLoading: isLoadingAllAssigned,
    data: dataAllAssigned,
    isError: isErrorAllAssigned,
  } = useAllAssignedEvents(userId);

  if (isLoadingRegisteredEvents || isLoadingAllAssigned) {
    return <Loader />;
  }
  if (isErrorRegisteredEvents || isErrorAllAssigned) {
    return <div>ERROR</div>;
  }

  return (
    <div>
      <PaginationEvents
        userId={userId}
        events={dataRegisteredEvents}
        itemsPerPage={3}
        header={'Registered Events'}
        isHome={false}
      />

      <PaginationEvents
        userId={userId}
        events={dataAllAssigned}
        itemsPerPage={3}
        header={'Assigned Events'}
        isHome={false}
      />
    </div>
  );
}

export default MusicianMyEventsPage;
