import { createContext, useEffect, useState } from 'react';
import { makeRequest } from '../../axios';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  // State to store the current user data
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  // Set user data to localStorage whenever the currentUser changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  /**
   * Function to handle user login.
   * @param {Object} inputs - The login credentials (e.g., username and password).
   */
  const login = async (inputs) => {
    const res = await makeRequest.post('/auth/login', inputs, {
      withCredentials: true,
    });
    const { Status, ...others } = res.data;
    setCurrentUser(others);
  };
  
  /**
   * Function to handle user logout.
   * clean user localStorage
   */
  const logout = async () => {
    await makeRequest.post('/auth/logout');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  /**
   * Update the user's Photo in localStorage and state.
   * @param {string} photoURL - The URL of the user's profile photo.
   */
  const updateLocalStoragePhoto = (photoURL) => {
    setCurrentUser((prevUser) => {
      const newUser = { ...prevUser, Photo: photoURL };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, updateLocalStoragePhoto }}
    >
      {children}
    </AuthContext.Provider>
  );
};
