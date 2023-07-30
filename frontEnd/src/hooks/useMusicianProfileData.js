import { makeRequest } from '../axios';
import { QueryClient, useMutation, useQuery } from 'react-query';

//#region ==============Get Musician Profile Data==============
/**
 * useMusicianProfileData
 * Custom React Query hook to fetch musician profile data for a user.
 * @param {string} userId - The ID of the musician user.
 * @param {boolean} isUser - Indicates whether the user is a musician.
 * @returns {useQuery} - React Query useQuery instance.
 */
export const useMusicianProfileData = (userId, isUser) => {
  return useQuery('getProfile', () => fetchMusicianProfileData(userId), {
    enabled: isUser,
  });
};
/**
 * fetchMusicianProfileData
 * Function to fetch musician profile data for a user.
 * @param {string} userId - The ID of the musician user.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const fetchMusicianProfileData = (userId) => {
  //axios request
  return makeRequest(`/user/profile/${userId}`);
};
//#endregion

//#region ==============Update Musician Profile==============
/**
 * useUpdateMusicianProfile
 * Custom React Query hook to update musician profile data for a user.
 * @returns {useMutation} - React Query useMutation instance.
 */

export const useUpdateMusicianProfile = () => {
  console.log('useUpdateMusicianProfile');
  const queryClient = new QueryClient();
  return useMutation(updateMusicianProfile, {
    onSettled: () => {
      console.log('onSettled');

      queryClient.invalidateQueries('getProfile');
    },
  });
};
/**
 * updateMusicianProfile
 * Function to update musician profile data for a user.
 * @param {Object} data - The updated profile data.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */

const updateMusicianProfile = (data) => {
  return makeRequest.post('/user/updateProfile', data);
};
//#endregion
