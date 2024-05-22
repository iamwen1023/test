import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import  UserProvider  from './context/UserContext.js';
import { useContext } from 'react';
import { UserContext } from './context/UserContext.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={isLoggedIn ? <Landing /> : <Index />} />
        <Route path="/landing-page" exact element={isLoggedIn ? <Landing /> :<Index /> } />
        <Route path="/login-page" exact element={<Login />} /> 
        <Route path="/profile-page" exact element={  <Profile />} />
        <Route path="/register-page" exact element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
