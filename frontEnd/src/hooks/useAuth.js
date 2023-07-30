import { useMutation } from 'react-query';
import { makeRequest } from '../axios';

//#region ==============Register User==============
/**
 * useRegister
 * Custom React Query hook to register a user.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useRegister = () => {
  return useMutation(register);
};
/**
 * register
 * Function to register a user.
 * @param {Object} data - The user registration data.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const register = (data) => {
  return makeRequest.post('/auth/register', data);
};
//#endregion

//#region ==============Forgot Password==============
/**
 * useForgotPassword
 * Custom React Query hook to handle the forgot password functionality.
 * @returns {useMutation} - React Query useMutation instance.
 */

export const useForgotPassword = () => {
  return useMutation(forgotPassword);
};
/**
 * forgotPassword
 * Function to initiate the forgot password process for a user.
 * @param {string} userEmail - The email address of the user whose password is to be reset.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */

const forgotPassword = (userEmail) => {
  return makeRequest.post('/auth/forgotPassword', userEmail);
};
//#endregion

//#region ==============Change Password==============

/**
 * useChangePassword
 * Custom React Query hook to handle the change password functionality.
 * @returns {useMutation} - React Query useMutation instance.
 */
export const useChangePassword = () => {
  return useMutation(changePassword);
};
/**
 * changePassword
 * Function to change the password for a user.
 * @param {string} userEmail - The email address of the user whose password is to be changed.
 * @returns {Promise} - A Promise representing the result of the axios POST request.
 */
const changePassword = (userEmail) => {
  return makeRequest.post('/auth/changePassword', userEmail);
};
//#endregion
