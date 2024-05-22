import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Rugby from './components/Rugby';
import Footer from './components/Footer'; // Import Footer if used
import './App.css'; // Optional for global styling
import  UserProvider  from './context/UserContext.js';
import { useContext } from 'react';
import { UserContext } from './context/UserContext.js';
import Login from './components/Login';
import Loading from './components/Loading.js';

function App() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rugby" element={isLoggedIn ? <Rugby /> : <Home /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/loading" element={<Loading />} />
          {/* <Route path="/foot" element={<Footer />} />  */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;