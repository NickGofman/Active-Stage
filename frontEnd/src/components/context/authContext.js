import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../../axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //check if already login
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    //we need to use axios here to ge the user details and
    console.log('In authContext');
    const res = await makeRequest.post('/auth/login', inputs, {
      withCredentials: true,
    });
    const { Status, ...others } = res.data;
    setCurrentUser(others);
  };
  //set user localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);
  //clean user localStorage
  const logout = async () => {
    const res = await makeRequest.post('/auth/logout');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
