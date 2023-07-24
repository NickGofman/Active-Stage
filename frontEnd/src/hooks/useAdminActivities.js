import { makeRequest } from '../axios';
import { useMutation, useQueryClient } from 'react-query';
const blockUser = (userId) => {
  //axios request
  return makeRequest.post(`/admin/blockUser/${userId}`);
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation((userId) => blockUser(userId), {
    onSettled: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries('getUpcomingEvents');
      queryClient.invalidateQueries('getSortedEventDataByType');
      queryClient.invalidateQueries('getThreeEventsToAssign');
      queryClient.invalidateQueries('useGetAllUsersPerEvent');

    }},);
};