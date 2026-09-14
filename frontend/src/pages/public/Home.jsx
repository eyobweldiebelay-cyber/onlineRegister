import React from "react";
import { Link } from "react-router-dom";
import "../../css/AboutLocationHome.css";
//import "../css/Home.css";

function Home() {
  return (
    <div className="page-container">

      {/* Hero Section */}
      <div className="page-hero home-hero">

        <h1>Welcome to Our College</h1>

        <p>
          New Student Registration System
        </p>

        <p>
          Apply online, submit your required documents, and complete your
          registration process conveniently without unnecessary travel or
          long waiting times.
        </p>

        <Link to="/register" className="common-button">
          Start Registration
        </Link>

      </div>

      {/* Registration Section */}
      <div className="page-section">

        <h2>Online Student Registration</h2>

        <p>
          Our online student registration system makes it easier for new
          students to begin their registration process. Students can create
          an account, provide their personal information, select an academic
          program, upload the required documents, and follow their
          registration status online.
        </p>

      </div>

      {/* Services Section */}
      <div className="page-section">

        <h2>Registration Services</h2>

        <div className="card-grid">

          <div className="common-card">
            <h3>Online Application</h3>
            <p>
              Complete your student application online from wherever you are.
            </p>
          </div>

          <div className="common-card">
            <h3>Document Submission</h3>
            <p>
              Upload the required documents securely as part of your
              registration process.
            </p>
          </div>

          <div className="common-card">
            <h3>Application Status</h3>
            <p>
              Check the progress and status of your registration application
              online.
            </p>
          </div>

          <div className="common-card">
            <h3>Online Communication</h3>
            <p>
              Receive important comments and registration information from
              the college through the system.
            </p>
          </div>

        </div>

      </div>

      {/* How It Works */}
      <div className="page-section">

        <h2>How Registration Works</h2>

        <div className="card-grid">

          <div className="common-card">
            <h3>1. Create an Account</h3>
            <p>
              Register for an account using your personal information.
            </p>
          </div>

          <div className="common-card">
            <h3>2. Complete Your Profile</h3>
            <p>
              Provide the required student information in your profile.
            </p>
          </div>

          <div className="common-card">
            <h3>3. Submit Documents</h3>
            <p>
              Upload the required documents for your application.
            </p>
          </div>

          <div className="common-card">
            <h3>4. Submit Application</h3>
            <p>
              Review your information and submit your application for
              registration.
            </p>
          </div>

        </div>

      </div>

      {/* Call To Action */}
      <div className="page-section home-action">

        <h2>Ready to Begin Your Registration?</h2>

        <p>
          Start your application today and manage your new student
          registration process online.
        </p>

        <Link to="/register" className="common-button">
          Register Now
        </Link>

      </div>

    </div>
  );
}

export default Home;