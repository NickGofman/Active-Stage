import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = (inputs) => {
    //we need to use axios here to ge the user details and set the currentuser
    setCurrentUser({
      id: 1,
      role: 'user',
      businessName: 'Elis pub',
      managerName: 'nick',
    });

    
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

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
