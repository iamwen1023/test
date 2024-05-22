import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { UserContext } from '../context/UserContext.js';


const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(UserContext);

  return (
    <header>
      {/* <Link to="/"><h1>Airbnb Clone</h1></Link>
      {isLoggedIn ? (
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      )} */}
    </header>
  );
};

export default Header;
