import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../../axios';


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //check if already login
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  //set user localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    console.log('In authContext');
    const res = await makeRequest.post('/auth/login', inputs, {
      withCredentials: true,
    });
    const { Status, ...others } = res.data;
    setCurrentUser(others);
  };

  //clean user localStorage
  const logout = async () => {
    await makeRequest.post('/auth/logout');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
