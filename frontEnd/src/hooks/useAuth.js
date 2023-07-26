import {  useMutation } from 'react-query';
import { makeRequest } from '../axios';

export const useRegister = () => {
  return useMutation(register);
};

const register = (data) => {
  return makeRequest.post('/auth/register', data);
};

export const useForgotPassword = () => {
  return useMutation(forgotPassword);
};
const forgotPassword = (userEmail) => {
  return makeRequest.post('/auth/forgotPassword', userEmail);
};


export const useChangePassword = () => {
  return useMutation(changePassword);
};
const changePassword = (userEmail) => {
  return makeRequest.post('/auth/changePassword', userEmail);
};
