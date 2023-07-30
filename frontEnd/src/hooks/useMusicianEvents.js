import { makeRequest } from '../axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
//#region ==============Get All Published Events==============
/**
 * useAllPublishedEvents
 * Custom React Query hook to fetch all published events for a user.
 * @param {string} userId - The ID of the user.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useAllPublishedEvents = (userId) => {
  return useQuery(['getAllPublishedEvents', userId], () =>
    getAllPublishedEvents(userId)
  );
};
/**
 * getAllPublishedEvents
 * Function to fetch all published events for a user.
 * @param {string} UserId - The ID of the user.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getAllPublishedEvents = (UserId) => {
  return makeRequest.get(`/user/getAllPublishedEvents/${UserId}`);
};
//#endregion

//#region ==============Register to Event==============

/**
 * useRegisterToEvent
 * Custom React Query hook to register a user to an event.
 * @param {string} userId - The ID of the user.
 * @param {string} EventId - The ID of the event.
 * @param {string} email - The email of the user.
 * @returns {useMutation} - React Query useMutation instance.
 */

export const useRegisterToEvent = (userId, EventId, email) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['RegisterToEvent', userId, EventId, email],
    () => RegisterToEvent(userId, EventId, email),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllPublishedEvents');
        //update
        queryClient.invalidateQueries('useAllRegisteredEvents');
      },
    }
  );
};
/**
 * RegisterToEvent
 * Function to register a user to an event.
 * @param {string} userId - The ID of the user.
 * @param {string} EventId - The ID of the event.
 * @param {string} email - The email of the user.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */

const RegisterToEvent = (userId, EventId, email) => {
  return makeRequest.post(
    `/user/registerToEvent/${userId}/${EventId}/${email}`
  );
};
//#endregion

//#region ==============Get All Assigned Events==============
/**
 * useAllAssignedEvents
 * Custom React Query hook to fetch all events assigned to a user.
 * @param {string} userId - The ID of the user.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useAllAssignedEvents = (userId) => {
  return useQuery(['useAllAssignedEvents', userId], () =>
    getAllAssignedEvents(userId)
  );
};
/**
 * getAllAssignedEvents
 * Function to fetch all events assigned to a user.
 * @param {string} UserId - The ID of the user.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getAllAssignedEvents = (UserId) => {
  return makeRequest.get(`/user/getAllAssignedEvents/${UserId}`);
};
//#endregion

//#region ==============Get All Registered Events==============
/**
 * useAllRegisteredEvents
 * Custom React Query hook to fetch all events registered by a user.
 * @param {string} userId - The ID of the user.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useAllRegisteredEvents = (userId) => {
  return useQuery(['useAllRegisteredEvents', userId], () =>
    getAllRegisteredEvents(userId)
  );
};
/**
 * getAllRegisteredEvents
 * Function to fetch all events registered by a user.
 * @param {string} UserId - The ID of the user.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getAllRegisteredEvents = (UserId) => {
  return makeRequest.get(`/user/getAllRegisteredEvents/${UserId}`);
};
//#endregion

//#region ==============Unregister from Event==============
/**
 * useUnregisterToEvent
 * Custom React Query hook to unregister a user from an event.
 * @param {string} userId - The ID of the user.
 * @param {string} EventId - The ID of the event.
 * @returns {useMutation} - React Query useMutation instance.
 */

export const useUnregisterToEvent = (userId, EventId) => {
  const queryClient = useQueryClient();

  return useMutation(
    ['useUnregisterToEvent', userId, EventId],
    () => unregisterToEvent(userId, EventId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('useAllRegisteredEvents');
      },
    }
  );
};
/**
 * unregisterToEvent
 * Function to unregister a user from an event.
 * @param {string} userId - The ID of the user.
 * @param {string} eventId - The ID of the event.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const unregisterToEvent = (userId, eventId) => {
  return makeRequest.post(`/user/unregisterToEvent/${userId}/${eventId}`);
};
//#endregion

//#region ==============Get All Previous Events==============
/**
 * useAllPreviousEvents
 * Custom React Query hook to fetch all previous events attended by a user.
 * @param {string} userId - The ID of the user.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useAllPreviousEvents = (userId) => {
  console.log('userId', userId);
  return useQuery(['getAllPreviousEvents', userId], () =>
    getAllPreviousEvents(userId)
  );
};
/**
 * getAllPreviousEvents
 * Function to fetch all previous events attended by a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const getAllPreviousEvents = (userId) => {
  console.log('getAllPreviousEvents', userId);
  return makeRequest.get(`/user/getAllPreviousEvents/${userId}`);
};
//#endregion
