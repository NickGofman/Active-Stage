import { makeRequest } from '../axios';
import { useQuery, useMutation } from 'react-query';
//#region ==============Fetch Admin Profile Data==============

/**
 * useAdminProfileData
 * Custom React Query hook to fetch the profile data of an admin.
 * @param {Function} onError - A callback function to handle errors during the API call.
 * @param {Function} onSuccess - A callback function to handle the successful API response.
 * @param {number} userId - The ID of the admin whose profile data is to be fetched.
 * @param {boolean} isUser - A boolean indicating whether the user is an admin or not.
 * @returns {useQuery} - React Query useQuery instance.
 */

export const useAdminProfileData = (onError, onSuccess, userId, isUser) => {
  return useQuery('getAdminProfile', () => fetchAdminProfileData(userId), {
    onSuccess,
    onError,
    enabled: !isUser,
  });
};
/**
 * fetchAdminProfileData
 * Function to fetch the profile data of an admin.
 * @param {number} userId - The ID of the admin whose profile data is to be fetched.
 * @returns {Promise} - A Promise representing the result of the axios GET request.
 */
const fetchAdminProfileData = (userId) => {
  //axios request
  return makeRequest.get(`/admin/profile/${userId}`);
};
//#endregion

//#region ==============Update Admin Profile Data==============

/**
 * useUpdateAdminData
 * Custom React Query hook to update the profile data of an admin.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useUpdateAdminData = () => {
  return useMutation('updateAdminProfile', updateAdminProfileData);
};
/**
 * updateAdminProfileData
 * Function to update the profile data of an admin.
 * @param {Object} data - The updated profile data of the admin.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const updateAdminProfileData = (data) => {
  //axios request
  return makeRequest.post('/admin/updateProfile', data);
};
//#endregion
