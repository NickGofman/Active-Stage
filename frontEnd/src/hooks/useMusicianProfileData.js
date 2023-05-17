import { makeRequest } from '../axios';
import { useQuery, Mutation } from 'react-query';
const fetchMusicianProfileData = (userId) => {
  console.log('IN fetchMusicianProfileData, userId: ', userId);
  //axios request
  return makeRequest(`/user/profile/${userId}`);
};

export const useMusicianProfileData = (onError, onSuccess, userId, isUser) => {
  console.log('IN useMusicianProfileData, userId: ', userId);
  return useQuery('getProfile', () => fetchMusicianProfileData(userId), {
    onSuccess,
    onError,
    enabled: isUser,
  });
};
