import { makeRequest } from '../axios';
import { useQuery, useMutation } from 'react-query';

//#region ==============CreateNewEvent==============

export const useCreateNewEvent = (data) => {
  console.log('IN useCreateNewEvent ', data);
  return useMutation('createNewEvent', createNewEvent);
};
const createNewEvent = (data) => {
  console.log('IN createNewEvent, data: ', data);
  //axios request
  return makeRequest.post('/admin/createEvent', data);
};
//#endregion


//#region ==============get musical type list==============

export const useGetMusicalStyles = () => {
  console.log('IN getMusicalStyles ');
  return useQuery('getMusicalStyles', getMusicalStyles);
};

const getMusicalStyles = () => {
  return makeRequest.get('/admin/getMusicalStyles');
};

//#endregion
