import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../../axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //check if already login
  const [currentUser, setCurrentUser] = useState(null);

  const login = (inputs) => {
    //we need to use axios here to ge the user details and
    console.log('In authContext');
    makeRequest
      .post('/auth/login', inputs)
      .then((response) => {
        // Handle successful registration
        console.log('Response In authContext: ', response);

        //set the current user
        setCurrentUser({
          id: response.data.UserId,
          role: response.data.Role,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(currentUser));
  // }, [currentUser]);

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
