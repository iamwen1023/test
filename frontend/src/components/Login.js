import React from "react";

import { useContext,  useState } from 'react';
import { UserContext } from '../context/UserContext.js';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from 'crypto-js';
const server_api = process.env.REACT_APP_API_BASE_URL;

const Login = () =>{
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    email: "john@example.com",
    password: "securepassword",
  });
  const [user, setUser] = useState({});
  const addUserHandler = (newUser) => setUser(newUser);
  const changeHandler = (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    // const encryptedPassword = CryptoJS.AES.encrypt(inputs.password, 'secret-key').toString();
    const newUser = { email: inputs.email, password: inputs.password };
    addUserHandler(newUser);
    const mydata = {
      data: {
        type: "token",
        attributes: { ...newUser },
      }
    }
    try {
      
      axios.post('http://localhost:8000/api/login', mydata,{
        headers: {
          "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json", 'Access-Control-Allow-Credentials': true },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setError('');
          alert('Login successful!');
          const token = response.data.token; 
          localStorage.setItem('authToken', token);
          handleLogin();
          navigate("/loading");
          // Add your successful login logic here
        } else {
          setError(response.message || 'Invalid email or password.');
        }
        
      });
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
    return (
      <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <form onSubmit={submitLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={inputs.email}
              onChange={changeHandler}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={inputs.password}
              onChange={changeHandler}
              required
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit">Login</button>
        </form>
      </header>
    </div>
    );
}

export default Login;
