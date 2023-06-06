import { makeRequest } from '../axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

//#region ==============CreateNewEvent==============

export const useCreateNewEvent = (onSuccess, onError) => {
  console.log('IN useCreateNewEvent ');
  return useMutation(createNewEvent, {
    onSuccess,
    onError,
  });
};

const createNewEvent = (data) => {
  // console.log('IN createNewEvent, data: ', data);
  //axios request
  return makeRequest.post('/admin/createEvent', data);
};
//#endregion

//#region ==============get musical type list==============
const getMusicalStyles = () => {
  return makeRequest.get('/admin/getMusicalStyles');
};

export const useGetMusicalStyles = () => {
  // console.log('IN getMusicalStyles ');
  return useQuery('getMusicalStyles', getMusicalStyles);
};

const getEventDates = () => {
  console.log('getEEventsDate');
  return makeRequest.get('/admin/eventsDates');
};
export const useGetEventDates = () => {
  return useQuery('getEventDates', getEventDates);
};

//#endregion

export const useAllAssignMusicians = () => {
  console.log('getAllAssignMusicians');
  return useQuery('getAllEvent', getAllAssignMusicians);
};

const getAllAssignMusicians = () => {
  return makeRequest.get('/admin/getAllAssignMusicians');
};

export const useGetThreeUpcomingEvents = () => {
  return useQuery('getThreeUpcomingEvents', getThreeUpcomingEvents);
};
const getThreeUpcomingEvents = () => {
  return makeRequest.get('/admin/getThreeUpcomingEvents');
};
export const useGetAllUsersPerEvent = (EventID) => {
  return useQuery(['getAllUsersPerEvent', EventID], () =>
    getAllUsersPerEvent(EventID)
  );
};
const getAllUsersPerEvent = (EventID) => {
  console.log(EventID);
  return makeRequest.get(`/admin/getAllUsersPerEvent/${EventID}`);
};
//#region ==============Assign musician to event==============
export const useAssignMusicianById = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => assignMusicianById(data), {
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries('getAllAssignMusicians');
      queryClient.invalidateQueries('getThreeUpcomingEvents');
      // Add any other relevant operations after successful mutation
    },
    // Add any other mutation options if needed
  });
};

const assignMusicianById = (data) => {
  const { eventId, userId } = data;
  return makeRequest.post(
    `/admin/assignMusicianToEventById/${eventId}/${userId}`
  );
};

//#endregion
