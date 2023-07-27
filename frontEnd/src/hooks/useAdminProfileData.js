import { makeRequest } from '../axios';
import { useQuery, useMutation } from 'react-query';
const fetchAdminProfileData = (userId) => {
  //axios request
  return makeRequest.get(`/admin/profile/${userId}`);
};

export const useAdminProfileData = (onError, onSuccess, userId, isUser) => {
  return useQuery('getAdminProfile', () => fetchAdminProfileData(userId), {
    onSuccess,
    onError,
    enabled: !isUser,
  });
};

export const useUpdateAdminData = () => {
  return useMutation('updateAdminProfile', updateAdminProfileData);
};
const updateAdminProfileData = (data) => {
  //axios request
  return makeRequest.post('/admin/updateProfile', data);
};
