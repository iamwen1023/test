import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./chat.css";


function Header() {
  return (
    <main>
    <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li className="nav-item">
           <Link to="/" className="nav-link px-2 link-secondary" aria-current="page">
             Home
           </Link>
         </li>
         <li className="nav-item">
           <Link to="/rugby" className="nav-link px-2">
             Rugby
           </Link>
         </li>
         <li className="nav-item">
           <Link to="/foot" className="nav-link px-2">
             Foot
           </Link>
         </li>
       </ul>

      <div class="col-md-3 text-end">
      <Link to="/login"><button type="button" class="btn btn-outline-primary me-2">Login</button></Link>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </header>
  </div>
  </main>
  );
}

export default Header;
