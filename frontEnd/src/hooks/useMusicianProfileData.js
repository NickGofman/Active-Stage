import { makeRequest } from '../axios';
import { useQuery } from 'react-query';
const fetchMusicianProfileData = (userId) => {
  console.log('fetchMusicianProfileData');  
  //axios request
  return makeRequest(`/user/profile/${userId}`);
};

export const useMusicianProfileData = ( userId, isUser) => {
  console.log('useMusicianProfileData');
  return useQuery('getProfile', () => fetchMusicianProfileData(userId), {
    
    enabled: isUser,
  });
};

