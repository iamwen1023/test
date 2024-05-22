import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./chat.css";

// import './Header.css'; // Optional for custom styling

function Header() {
  return (
    // <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    //   <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
    //     <span className="fs-4">My App</span>
    //   </Link>

    //   <ul className="nav nav-pills">
    //     <li className="nav-item">
    //       <Link to="/" className="nav-link active" aria-current="page">
    //         Home
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/rugby" className="nav-link">
    //         Rugby
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/foot" className="nav-link">
    //         Foot
    //       </Link>
    //     </li>
    //   </ul>
    // </header>
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
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </header>
  </div>
  </main>
  );
}

export default Header;
