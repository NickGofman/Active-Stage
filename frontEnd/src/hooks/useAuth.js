import { useQuery, useMutation } from 'react-query';
import { makeRequest } from '../axios';

export const useRegister = () => {
  return useMutation(register);
};

const register = (data) => {
  return makeRequest.post('/auth/register', data);
};

