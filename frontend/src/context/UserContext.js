import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state

  // Login/logout logic would be implemented here (replace with your authentication logic)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, handleLogin, handleLogout };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export default UserProvider;