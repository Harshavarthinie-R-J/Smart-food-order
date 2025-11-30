// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">🏨 Hotel Management
        </Link>
        
        <nav className="header-nav">
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/help" className="nav-link">
            Help
          </Link>
          <Link to="/feedback" className="nav-link">
            Feedback
          </Link>
          <Link to="/admin-login" className="nav-link admin-link">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;