import { makeRequest } from '../axios';
import { useQuery, Mutation } from 'react-query';
const fetchMusicianProfileData = (userId) => {
  //axios request
  return makeRequest(`/user/profile/${userId}`);
};

export const useMusicianProfileData = ( userId, isUser) => {
  return useQuery('getProfile', () => fetchMusicianProfileData(userId), {
    
    enabled: isUser,
  });
};

