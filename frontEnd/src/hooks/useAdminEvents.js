import { makeRequest } from '../axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

//#region ==============CreateNewEvent==============
/**
 * useCreateNewEvent
 * Custom React Query hook to create a new event.
 * @param {function} onSuccess - Callback function to be called on successful mutation.
 * @param {function} onError - Callback function to be called on mutation error.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useCreateNewEvent = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(createNewEvent, {
    onSuccess,
    onError,
    onSettled: () => {
      // Invalidate queries for both getEventsPassedWithoutIncome and getSortedEventDataByType
      queryClient.invalidateQueries('getEventsPassedWithoutIncome');
      queryClient.invalidateQueries('getSortedEventDataByType');
    },
  });
};
/**
 * createNewEvent
 * Function to create a new event.
 * @param {Object} data - The data of the new event to be created.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const createNewEvent = (data) => {
  return makeRequest.post('/admin/createEvent', data);
};
//#endregion

//#region ==============get musical type list==============

/**
 * useGetMusicalStyles
 * Custom React Query hook to fetch the list of musical styles.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetMusicalStyles = () => {
  return useQuery('getMusicalStyles', getMusicalStyles, {});
};
/**
 * getMusicalStyles
 * Function to get the list of musical styles.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getMusicalStyles = () => {
  return makeRequest.get('/admin/getMusicalStyles');
};
//#endregion

//#region ==============get Event Dates list==============
/**
 * useGetEventDates
 * Custom React Query hook to fetch the list of event dates.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetEventDates = () => {
  return useQuery('getEventDates', getEventDates);
};

/**
 * getEventDates
 * Function to get the list of event dates.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getEventDates = () => {
  return makeRequest.get('/admin/eventsDates');
};
//#endregion

//#region ==============Get Three Events To Assign==============

/**
 * useGetThreeEventsToAssign
 * Custom React Query hook to fetch three events that need to be assigned to musicians.
 * @returns {useQuery} - React Query useQuery instance.
 */

export const useGetThreeEventsToAssign = () => {
  return useQuery('getThreeEventsToAssign', getThreeEventsToAssign);
};
/**
 * getThreeEventsToAssign
 * Function to get three events that need to be assigned to musicians.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getThreeEventsToAssign = () => {
  return makeRequest.get('/admin/getThreeEventsToAssign');
};
//#endregion

//#region ==============Get All Users Per Event==============

/**
 * useGetAllUsersPerEvent
 * Custom React Query hook to fetch all users registered for a specific event.
 * @param {number} eventId - The ID of the event for which to fetch the users.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetAllUsersPerEvent = (eventId) => {
  return useQuery(['useGetAllUsersPerEvent', eventId], () =>
    getAllUsersPerEvent(eventId)
  );
};
/**
 * getAllUsersPerEvent
 * Function to fetch all users registered for a specific event.
 * @param {number} EventID - The ID of the event for which to fetch the users.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getAllUsersPerEvent = (EventID) => {
  return makeRequest.get(`/admin/getAllUsersPerEvent/${EventID}`);
};
//#endregion

//#region ==============Assign musician to event==============
/**
 * useAssignMusicianById
 * Custom React Query hook to assign a musician to an event.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useAssignMusicianById = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => assignMusicianById(data), {
    onSettled: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries('getThreeEventsToAssign');
      queryClient.invalidateQueries('getEventsForCalendar');
      queryClient.invalidateQueries('getSortedEventDataByType');
      // Add any other relevant operations after successful mutation
    },
    // Add any other mutation options if needed
  });
};
/**
 * assignMusicianById
 * Function to assign a musician to an event by their userId and eventId.
 * @param {Object} data - The data of the musician assignment (eventId and userId).
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const assignMusicianById = (data) => {
  const { eventId, userId } = data;
  return makeRequest.post(
    `/admin/assignMusicianToEventById/${eventId}/${userId}`
  );
};
//#endregion

//#region ==============Get Events Passed Without Income==============
/**
 * useGetEventsPassedWithoutIncome
 * Custom React Query hook to fetch events that have passed without income.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetEventsPassedWithoutIncome = () => {
  return useQuery('getEventsPassedWithoutIncome', getEventsPassedWithoutIncome);
};
/**
 * getEventsPassedWithoutIncome
 * Function to fetch events that have passed without income.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getEventsPassedWithoutIncome = () => {
  return makeRequest.get('/admin/getEventsPassedWithoutIncome');
};
//#endregion

//#region ==============Add income to event==============
/**
 * useAddIncome
 * Custom React Query hook to add income to an event.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useAddIncome = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => addIncome(data), {
    onSettled: () => {
      // Invalidate queries for both getEventsPassedWithoutIncome and getSortedEventDataByType
      queryClient.invalidateQueries('getEventsPassedWithoutIncome');
      queryClient.invalidateQueries('getSortedEventDataByType');
      queryClient.invalidateQueries('getEventsForCalendar');
    },
  });
};
/**
 * addIncome
 * Function to add income to an event.
 * @param {Object} data - The data of the income to be added (eventId and income).
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const addIncome = (data) => {
  const { eventId, income } = data;
  return makeRequest.post(`/admin/addIncome/${eventId}`, { income });
};
//#endregion

//#region ==============Get events for calendar==============
/**
 * useGetEventsForCalendar
 * Custom React Query hook to fetch the list of events for the calendar (except with status canceled).
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetEventsForCalendar = () => {
  return useQuery('getEventsForCalendar', getEventsForCalendar);
};
/**
 * getEventsForCalendar
 * Function to get the list of events for the calendar.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getEventsForCalendar = () => {
  return makeRequest.get('/admin/getEventsForCalendar');
};
//#endregion

//#region ==============Get three upcoming events==============
/**
 * useGetThreeUpcomingEvents
 * Custom React Query hook to fetch the list of three upcoming events (status assigned).
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetThreeUpcomingEvents = () => {
  return useQuery('getThreeUpcomingEvents', getThreeUpcomingEvents);
};
/**
 * getThreeUpcomingEvents
 * Function to get the list of three upcoming events.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getThreeUpcomingEvents = () => {
  return makeRequest.get('/admin/getThreeUpcomingEvents');
};
//#endregion

//#region ==============Get sorted event data by type==============
/**
 * useSortedEventDataByType
 * Custom React Query hook to fetch sorted event data by type.
 * @param {Object} data - The data for sorting events (sortType, startDate, endDate).
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useSortedEventDataByType = (data) => {
  return useQuery(['getSortedEventDataByType', data], () =>
    getSortedEventDataByType(data)
  );
};
/**
 * getSortedEventDataByType
 * Function to get sorted event data by type (e.g., date range and sort type).
 * @param {Object} data - The data for sorting events (sortType, startDate, endDate).
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getSortedEventDataByType = (data) => {
  const { sortType, startDate, endDate } = data;
  return makeRequest.get(
    `/admin/getSortedEventDataByType/${sortType}/${startDate}/${endDate}`
  );
};
//#endregion

//#region ==============Cancel event==============
/**
 * useCancelEvent
 * Custom React Query hook to cancel an event.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useCancelEvent = () => {
  const queryClient = useQueryClient();

  return useMutation((eventId) => cancelEvent(eventId), {
    onSettled: () => {
      queryClient.invalidateQueries('getSortedEventDataByType');
    },
    // Add any other mutation options if needed
  });
};
/**
 * cancelEvent
 * Function to cancel an event by its eventId and eventStatus.
 * @param {Object} data - The data of the event to be canceled (eventId and eventStatus).
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const cancelEvent = (data) => {
  return makeRequest.post(
    `/admin/cancelEvent/${data.EventId}/${data.eventStatus}`
  );
};
//#endregion

//#region ==============Update Event==============
/**
 * useUpdateEvent
 * Custom React Query hook to update an event.
 * @returns {useMutation} - React Query useMutation instance.
 */
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
/**
 * updateEvent
 * Function to update an event with the given data.
 * @param {Object} data - The data of the event to be updated (eventId, Status, and others).
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const updateEvent = (data) => {
  const { eventId, Status, ...others } = data;

  return makeRequest.post(`/admin/updateEvent/${eventId}/${Status}`, others);
};
//#endregion

//#region ==============Cancel passed events==============
/**
 * useCancelPassedEvents
 * Custom React Query hook to cancel passed events.
 * @returns {useMutation} - React Query useMutation instance.
 */

export const useCancelPassedEvents = () => {
  return useMutation('cancelPassedEvents', cancelPassedEvents);
};
/**
 * cancelPassedEvents
 * Function to cancel passed events.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const cancelPassedEvents = () => {
  //axios request
  return makeRequest.post('/admin/cancelPassedEvents');
};
//#endregion

//#region ==============Get sorted event reports==============
/**
 * useSortedEventReports
 * Custom React Query hook to fetch sorted event reports.
 * @param {Object} data - The data for filtering and sorting event reports.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useSortedEventReports = (data) => {

  return useQuery(['getSortedEventReports', data], () =>
    getSortedEventReports(data)
  );
};
/**
 * getSortedEventReports
 * Function to get sorted event reports based on filtering and sorting criteria.
 * @param {Object} data - The data for filtering and sorting event reports.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const getSortedEventReports = (data) => {
  return makeRequest.post('/admin/getFilteredReports', data); // Use makeRequest.post instead of makeRequest.get
};
//#endregion

//#region ==============Get band names==============
/**
 * useGetBandNames
 * Custom React Query hook to fetch the list of band names based on a date range.
 * @param {Object} data - The data for filtering band names (startDate and endDate).
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetBandNames = (data) => {
  return useQuery(['getBandNames', data], () => getBandNames(data));
};

/**
 * getBandNames
 * Function to get the list of band names based on a date range.
 * @param {Object} data - The data for filtering band names (startDate and endDate).
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const getBandNames = (data) => {
  return makeRequest.post(`/admin/getBandNames`, data);
};
//#endregion

//#region ==============Get musical styles by date==============
/**
 * useGetMusicalStylesByDate
 * Custom React Query hook to fetch the list of musical styles based on a date range.
 * @param {Object} data - The data for filtering musical styles (startDate and endDate).
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useGetMusicalStylesByDate = (data) => {
  return useQuery(['getMusicalStylesByDate', data], () =>
    getMusicalStylesByDate(data)
  );
};

/**
 * getMusicalStylesByDate
 * Function to get the list of musical styles based on a date range.
 * @param {Object} data - The data for filtering musical styles (startDate and endDate).
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const getMusicalStylesByDate = (data) => {
  return makeRequest.post(`/admin/getMusicalStylesByDate`, data);
};
//#endregion
