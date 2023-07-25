import { makeRequest } from '../axios';
import { QueryClient, useMutation, useQuery } from 'react-query';
const fetchMusicianProfileData = (userId) => {
  //axios request
  return makeRequest(`/user/profile/${userId}`);
};

export const useMusicianProfileData = ( userId, isUser) => {
  return useQuery('getProfile', () => fetchMusicianProfileData(userId), {
    enabled: isUser,
  });
};

export const useUpdateMusicianProfile = () => {
  console.log('useUpdateMusicianProfile');
  const queryClient=new QueryClient();
  return useMutation(updateMusicianProfile,{
    onSettled:()=>{
        console.log('onSettled');

      queryClient.invalidateQueries('getProfile');
    }
  });
};

const updateMusicianProfile = (data) => {
  return makeRequest.post('/user/updateProfile', data);
};

