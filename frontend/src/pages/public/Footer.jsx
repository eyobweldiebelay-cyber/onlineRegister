
import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/Footer.css";

import {
  FaTelegram,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* College Information */}
        <div className="footer-section">
          <h2>Our College</h2>

          <p>
            Welcome to Our College Online Student Registration System.
            Apply online, submit your documents, and follow your registration
            process conveniently.
          </p>
        </div>


        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/about">
            About Us
          </NavLink>

          <NavLink to="/location">
            Location
          </NavLink>

          <NavLink to="/login">
            Login
          </NavLink>

          <NavLink to="/register">
            Register
          </NavLink>
        </div>


        {/* Student Services */}
        <div className="footer-section">
          <h3>Student Services</h3>

          <p>Online Application</p>
          <p>Document Submission</p>
          <p>Registration Status</p>
          <p>Student Support</p>
        </div>


        {/* Social Media */}
        <div className="footer-section">
          <h3>Connect With Us</h3>

          <div className="footer-social">

            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://youtube.com/@youryoutube"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            >
              <FaTelegram />
            </a>

            <a
              href="https://instagram.com/yourinstagram"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com/yourfacebook"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

          </div>
        </div>

      </div>


      {/* Copyright */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Our College.
          All rights reserved.
        </p>

        <p>
          Online Student Registration System
        </p>

      </div>

    </footer>
  );
}

export default Footer;

