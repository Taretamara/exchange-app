import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <h1>Currency App</h1> 
    </div>
    <ul className="navbar-links">
      <li>
        <Link to="/converter">Currency Converter</Link>
      </li>
      <li>
        <Link to="/rates">Exchange Rates</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
