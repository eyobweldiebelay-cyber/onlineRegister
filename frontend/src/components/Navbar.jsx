import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">
          Online Student Register System
        </Link>
      </div>

      <div className="navbar-menu">

        <Link to="/">
          Home
        </Link>

        <Link to="/about">
          About Us
        </Link>

        <Link to="/location">
          Location
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;