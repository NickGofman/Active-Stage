import React, { useContext } from 'react';

import PaginationEvents from '../components/pagination/PaginationEvents';
import {
  useAllAssignedEvents,
  useAllRegisteredEvents,
} from '../hooks/useMusicianEvents';
import { AuthContext } from '../components/context/authContext';
import Loader from '../components/loader/Loader';
//TODO REMOVE ALL DRILLING userID and Email -> USE USeContext

function MusicianMyEventsPage() {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser ? currentUser.UserId : null;
  //TODO- make sure each pagination gets his data
  const { isLoading, data, isError, error } = useAllRegisteredEvents(userId);
  const {
    isLoading: isLoadingAllAssigned,
    data: dataAllAssigned,
    isError: isErrorAllAssigned,
    error: errorAllAssigned,
  } = useAllAssignedEvents(userId);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error: {error}</div>;
  }
  if (isLoadingAllAssigned) {
    return <Loader />;
  }

  if (isErrorAllAssigned) {
    return <div>Error: {errorAllAssigned}</div>;
  }

  return (
    <div>
      <PaginationEvents
        userId={userId}
        events={data}
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
