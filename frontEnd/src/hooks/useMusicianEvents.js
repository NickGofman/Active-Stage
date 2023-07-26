import { makeRequest } from '../axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export const useAllPublishedEvents = (userId) => {
  return useQuery(['getAllPublishedEvents', userId], () =>
    getAllPublishedEvents(userId)
  );
};

const getAllPublishedEvents = (UserId) => {
  return makeRequest.get(`/user/getAllPublishedEvents/${UserId}`);
};

//register to event

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

const RegisterToEvent = (userId, EventId, email) => {

  return makeRequest.post(
    `/user/registerToEvent/${userId}/${EventId}/${email}`
  );
};

export const useAllAssignedEvents = (userId) => {
  return useQuery(['useAllAssignedEvents', userId], () =>
    getAllAssignedEvents(userId)
  );
};

const getAllAssignedEvents = (UserId) => {
  return makeRequest.get(`/user/getAllAssignedEvents/${UserId}`);
};

export const useAllRegisteredEvents = (userId) => {
  return useQuery(['useAllRegisteredEvents', userId], () =>
    getAllRegisteredEvents(userId)
  );
};

const getAllRegisteredEvents = (UserId) => {
  return makeRequest.get(`/user/getAllRegisteredEvents/${UserId}`);
};

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

const unregisterToEvent = (userId, eventId) => {
  return makeRequest.post(`/user/unregisterToEvent/${userId}/${eventId}`);
};
export const useAllPreviousEvents = (userId) => {
  console.log('userId', userId);
  return useQuery(['getAllPreviousEvents', userId], () =>
    getAllPreviousEvents(userId)
  );
};

const getAllPreviousEvents = (userId) => {
  console.log('getAllPreviousEvents', userId);
  return makeRequest.get(`/user/getAllPreviousEvents/${userId}`);
};