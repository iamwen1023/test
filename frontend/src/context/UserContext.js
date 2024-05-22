import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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

//If you have a PrivateRoute component that checks for the presence of a token in localStorage to determine 
//if the user is logged in, you may not need to use a UserProvider context specifically for tracking login state.
// The PrivateRoute component can handle protecting routes based on the presence of the token.