import { makeRequest } from '../axios';
import { useQuery, useMutation } from 'react-query';
const fetchAdminProfileData = (userId) => {
  console.log('IN fetchAdminProfileData, userId: ', userId);
  //axios request
  return makeRequest.get(`/admin/profile/${userId}`);
};
const updateAdminProfileData = (data) => {
  console.log('IN updateAdminProfileData, data: ', data);
  //axios request
  return makeRequest.post('/admin/updateProfile', data);
};

export const useAdminProfileData = (onError, onSuccess, userId, isUser) => {
  console.log('IN useAdminProfileData, userId: ', userId);
  return useQuery('getAdminProfile', () => fetchAdminProfileData(userId), {
    onSuccess,
    onError,
    enabled: !isUser,
  });
};

export const useUpdateAdminData = () => {
  return useMutation('updateAdminProfile', updateAdminProfileData);
};

