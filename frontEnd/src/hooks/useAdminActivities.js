import { makeRequest } from '../axios';
import { useMutation, useQueryClient } from 'react-query';

//#region ==============Block User==============

/**
useBlockUser
Custom React Query hook to block a user.
@returns {useMutation} - React Query useMutation instance.
*/
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
/**

blockUser
Function to block a user by their userId.
@param {string} userId - The ID of the user to be blocked.
@returns {Promise} - A Promise representing the result of the axios POST request.
*/
const blockUser = (userId) => {
  //axios request
  return makeRequest.post(`/admin/blockUser/${userId}`);
};

//#endregion

//#region ==============Add New Musical Style==============
/**
useAddNewMusicalStyle
Custom React Query hook to add a new musical style.
@param {function} onSuccess - Callback function to be called on successful mutation.
@param {function} onError - Callback function to be called on mutation error.
@returns {useMutation} - React Query useMutation instance.
*/
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
/**
addNewMusicalStyle
Function to add a new musical style.
@param {Object} musicalStyleToAdd - The musical style data to be added.
@returns {Promise} - A Promise representing the result of the axios POST request.
*/
const addNewMusicalStyle = (musicalStyleToAdd) => {
  return makeRequest.post(`/admin/addNewMusicalStyle/${musicalStyleToAdd}`);
};
//#endregion
