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

export const useProfilePhoto = (userId) => {
  return useQuery('useProfilePhoto', () => fetchMusicianProfilePhoto(userId), {
 
    onError: (error) => {
      console.log('Error fetching profile photo:', error);
    },
  });
};

const fetchMusicianProfilePhoto = async (userId) => {
  try {
    const response = await makeRequest.get(`/user/profile/photo/${userId}`, {
      responseType: 'blob', // Set the response type to 'blob'
    });

    return response.data; // Return the Blob object from the response
  } catch (error) {
    throw new Error('Failed to fetch profile photo');
  }
};
