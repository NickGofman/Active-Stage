import { makeRequest } from '../axios';
import { useQuery, useMutation } from 'react-query';
const createNewEvent = (data) => {
  console.log('IN createNewEvent, data: ', data);
  //axios request
  return makeRequest.post('/admin/createEvent', data);
};

export const useCreateNewEvent = (data) => {
  console.log('IN useCreateNewEvent ', data);
  return useMutation('createNewEvent', createNewEvent);
};
