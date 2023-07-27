import { makeRequest } from '../axios';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

export const useBlockUser = () => {
  const queryClient = useQueryClient();
  return useMutation((userId) => blockUser(userId), {
    onSettled: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries('getUpcomingEvents');
      queryClient.invalidateQueries('getSortedEventDataByType');
      queryClient.invalidateQueries('getThreeEventsToAssign');
      queryClient.invalidateQueries('useGetAllUsersPerEvent');
    },
  });
};
const blockUser = (userId) => {
  //axios request
  return makeRequest.post(`/admin/blockUser/${userId}`);
};

export const useAddNewMusicalStyle = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(
    (musicalStyleToAdd) => addNewMusicalStyle(musicalStyleToAdd),
    {
      onError: (error) => {
        onError(error) && onError(error); // Call the provided onError function if available
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries('getMusicalStyles');
        onSuccess && onSuccess(data); // Call the provided onSuccess function if available
      },
    }
  );
};

const addNewMusicalStyle = (musicalStyleToAdd) => {
  return makeRequest.post(`/admin/addNewMusicalStyle/${musicalStyleToAdd}`);
};
