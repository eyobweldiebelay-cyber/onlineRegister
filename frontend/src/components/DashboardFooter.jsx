
import React from "react";
import "../css/DashboardFooter.css";

function DashboardFooter() {
  return (
    <footer className="dashboard-footer">

      <div className="dashboard-footer-content">

        <div>
          <strong>Our College</strong>
          <span>Online Student Registration System</span>
        </div>

        <p>
          © {new Date().getFullYear()} Our College. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default DashboardFooter;

