import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Rugby from './components/Rugby';
import Footer from './components/Footer'; // Import Footer if used
import './App.css'; // Optional for global styling
// import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rugby" element={<Rugby />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/foot" element={<Footer />} />  */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;