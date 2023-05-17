import { makeRequest } from '../axios';
import { useQuery,Mutation, useQueryClient, useMutation } from 'react-query';
const fetchAdminProfileData = (userId) => {
  console.log('IN fetchAdminProfileData, userId: ', userId);
  //axios request
  return makeRequest(`/admin/profile/${userId}`);
};
const updateAdminProfileData = (data) => {
  console.log('IN updateAdminProfileData, userId: ', data);
  //axios request
  // return makeRequest(`/admin/profile/${data}`);
};

export const useAdminProfileData = (onError, onSuccess, userId) => {
  console.log('IN useAdminProfileData, userId: ', userId);
  return useQuery('getProfile', () => fetchAdminProfileData(userId), {
    onSuccess,
    onError,
    
  });
};


export const useUpdateAdminData = (data) => {
  console.log('IN useGetAdminData: ', data);
   const queryClient = useQueryClient();
   return useMutation(updateAdminProfileData,);

};
