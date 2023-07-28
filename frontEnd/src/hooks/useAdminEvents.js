import { makeRequest } from '../axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

//#region ==============CreateNewEvent==============

export const useCreateNewEvent = (onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useMutation(createNewEvent, {
    onSuccess,
    onError,
    onSettled: () => {
      // Invalidate queries for both getEventsPassedWithoutIncome and getSortedEventDataByType
      queryClient.invalidateQueries('getEventsPassedWithoutIncome');
      queryClient.invalidateQueries('getSortedEventDataByType');

      // Add any other relevant operations after the mutation is settled
    },
  });
};

const createNewEvent = (data) => {
  //axios request
  return makeRequest.post('/admin/createEvent', data);
};
//#endregion

//#region ==============get musical type list==============
const getMusicalStyles = () => {
  return makeRequest.get('/admin/getMusicalStyles');
};

export const useGetMusicalStyles = () => {
  return useQuery('getMusicalStyles', getMusicalStyles, {});
};

const getEventDates = () => {
  return makeRequest.get('/admin/eventsDates');
};
export const useGetEventDates = () => {
  return useQuery('getEventDates', getEventDates);
};

//#endregion

export const useGetThreeEventsToAssign = () => {
  return useQuery('getThreeEventsToAssign', getThreeEventsToAssign);
};
const getThreeEventsToAssign = () => {
  return makeRequest.get('/admin/getThreeEventsToAssign');
};
export const useGetAllUsersPerEvent = (eventId) => {
  return useQuery(['useGetAllUsersPerEvent', eventId], () =>
    getAllUsersPerEvent(eventId)
  );
};

const getAllUsersPerEvent = (EventID) => {
  return makeRequest.get(`/admin/getAllUsersPerEvent/${EventID}`);
};
//#region ==============Assign musician to event==============
export const useAssignMusicianById = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) => assignMusicianById(data),

    {
      onSettled: () => {
        // Invalidate relevant queries
        queryClient.invalidateQueries('getThreeEventsToAssign');
        queryClient.invalidateQueries('getEventsForCalendar');
        queryClient.invalidateQueries('getSortedEventDataByType');
        // Add any other relevant operations after successful mutation
      },
      // Add any other mutation options if needed
    }
  );
};

const assignMusicianById = (data) => {
  const { eventId, userId } = data;
  return makeRequest.post(
    `/admin/assignMusicianToEventById/${eventId}/${userId}`
  );
};

//#endregion
export const useGetEventsPassedWithoutIncome = () => {
  return useQuery('getEventsPassedWithoutIncome', getEventsPassedWithoutIncome);
};

const getEventsPassedWithoutIncome = () => {
  return makeRequest.get('/admin/getEventsPassedWithoutIncome');
};

export const useAddIncome = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addIncome(data), {
    onSettled: () => {
      // Invalidate queries for both getEventsPassedWithoutIncome and getSortedEventDataByType
      queryClient.invalidateQueries('getEventsPassedWithoutIncome');
      queryClient.invalidateQueries('getSortedEventDataByType');
      queryClient.invalidateQueries('getEventsForCalendar');
      // Add any other relevant operations after the mutation is settled
    },
    // Add any other mutation options if needed
  });
};

const addIncome = (data) => {
  const { eventId, income } = data;
  return makeRequest.post(`/admin/addIncome/${eventId}`, { income });
};

export const useGetEventsForCalendar = () => {
  return useQuery('getEventsForCalendar', getEventsForCalendar);
};
const getEventsForCalendar = () => {
  return makeRequest.get('/admin/getEventsForCalendar');
};

export const useGetThreeUpcomingEvents = () => {
  return useQuery('getThreeUpcomingEvents', getThreeUpcomingEvents);
};
const getThreeUpcomingEvents = () => {
  return makeRequest.get('/admin/getThreeUpcomingEvents');
};

export const useSortedEventDataByType = (data) => {
  return useQuery(['getSortedEventDataByType', data], () =>
    getSortedEventDataByType(data)
  );
};

const getSortedEventDataByType = (data) => {
  const { sortType, startDate, endDate } = data;
  return makeRequest.get(
    `/admin/getSortedEventDataByType/${sortType}/${startDate}/${endDate}`
  );
};

export const useCancelEvent = () => {
  const queryClient = useQueryClient();

  return useMutation((eventId) => cancelEvent(eventId), {
    onSettled: () => {
      queryClient.invalidateQueries('getSortedEventDataByType');
    },
    // Add any other mutation options if needed
  });
};

const cancelEvent = (data) => {
  return makeRequest.post(
    `/admin/cancelEvent/${data.EventId}/${data.eventStatus}`
  );
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => updateEvent(data), {
    onSettled: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries('getEventsForCalendar');
      queryClient.invalidateQueries('getSortedEventDataByType');
    },
  });
};

const updateEvent = (data) => {
  const { eventId, Status, ...others } = data;

  return makeRequest.post(`/admin/updateEvent/${eventId}/${Status}`, others);
};
export const useCancelPassedEvents = () => {
  return useMutation('cancelPassedEvents', cancelPassedEvents);
};
const cancelPassedEvents = () => {
  //axios request
  return makeRequest.post('/admin/cancelPassedEvents');
};

export const useSortedEventReports = (data) => {
  console.log('FRONT: useSortedEventReports');

  return useQuery(['getSortedEventReports', data], () =>
    getSortedEventReports(data)
  );
};

const getSortedEventReports = (data) => {
  return makeRequest.post('/admin/getFilteredReports', data); // Use makeRequest.post instead of makeRequest.get
};

export const useGetBandNames = (data) => {
  const { startDate, endDate } = data;
  return useQuery(['getBandNames', data], () =>
    getBandNames(data)
  );
};
const getBandNames = (data) => {
  return makeRequest.post(`/admin/getBandNames`,data);
};
export const useGetMusicalStylesByDate = (data) => {

  return useQuery(['getMusicalStylesByDate',data], () =>
    getMusicalStylesByDate(data)
  );
};
const getMusicalStylesByDate = (data) => {
  return makeRequest.post(
    `/admin/getMusicalStylesByDate`,data
  );
};
