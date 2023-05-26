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
