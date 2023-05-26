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

  console.log('useRegisterToEvent', userId, EventId, email);
  return useMutation(
    ['RegisterToEvent', userId, EventId, email],
    () => RegisterToEvent(userId, EventId, email),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getAllPublishedEvents');
      },
    }
  );
};

const RegisterToEvent = (userId, EventId, email) => {
  console.log('RegisterToEvent', userId, EventId, email);

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
  return useQuery(['useAllAssignedEvents', userId], () =>
    getAllRegisteredEvents(userId)
  );
};

const getAllRegisteredEvents = (UserId) => {
  return makeRequest.get(`/user/getAllRegisteredEvents/${UserId}`);
};
