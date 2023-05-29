import React from 'react';

import PaginationEvents from '../components/pagination/PaginationEvents';
import {
  useAllAssignedEvents,
  useAllRegisteredEvents,
} from '../hooks/useMusicianEvents';

function MusicianMyEventsPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.UserId : null;
  const userEmail = user ? user.Email : null;
  //TODO- make sure each pagination gets his data
  const { isLoading, data, isError, error } = useAllRegisteredEvents(userId);
  const {
    isLoading: isLoadingAllAssigned,
    data: dataAllAssigned,
    isError: isErrorAllAssigned,
    error: errorAllAssigned,
  } = useAllAssignedEvents(userId);


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error}</div>;
  }
  if (isLoadingAllAssigned) {
    return <div>Loading...</div>;
  }


  if (isErrorAllAssigned) {
    return <div>Error: {errorAllAssigned}</div>;
  }

  return (
    <>
      <PaginationEvents
        userId={userId}
        userEmail={userEmail}
        events={data}
        itemsPerPage={3}
        header={'Registered Events'}
        isHome={false}
      />
      <PaginationEvents
        userId={userId}
        userEmail={userEmail}
        events={dataAllAssigned}
        itemsPerPage={3}
        header={'Assigned Events'}
        isHome={false}
      />
    </>
  );
}

export default MusicianMyEventsPage;
