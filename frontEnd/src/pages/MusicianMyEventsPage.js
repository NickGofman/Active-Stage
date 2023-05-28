import React from 'react';

import PaginationEvents from '../components/pagination/PaginationEvents';
import { useAllAssignedEvents, useAllRegisteredEvents } from '../hooks/useMusicianEvents';

function MusicianMyEventsPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.UserId : null;
  const userEmail = user ? user.Email : null;
  const {
    isLoading: isLoadingAllAssigned,
    data: dataAllAssigned,
    isError: isErrorAllAssigned,
   error: errorAllAssigned,
  } = useAllAssignedEvents(userId);
  // make sure the musician is'nt already registered to the current event,
  //TODO- make sure each pagination gets his data
  const {
    isLoading: isLoadingRegisteredEvent,
    data: dataRegisteredEvent,
    isError: isErrorRegisteredEvent,
    error: errorRegisteredEvent,
  } = useAllRegisteredEvents(userId);
  // make sure the musician is'nt already registered to the current event,

  if (isLoadingRegisteredEvent) {
    return <div>Loading...</div>;
  }

  if (isErrorRegisteredEvent) {
    return <div>Error: {errorRegisteredEvent}</div>;
  }
    if (isLoadingAllAssigned) {
      return <div>Loading...</div>;
    }

    if (isErrorAllAssigned) {
      return <div>Error: {errorAllAssigned}</div>;
    }
  // console.log('dataAllAssigned', dataAllAssigned);
  console.log('dataRegisteredEvent', dataRegisteredEvent);

  return (
    <>
      <PaginationEvents
        userId={userId}
        userEmail={userEmail}
        events={dataRegisteredEvent}
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
