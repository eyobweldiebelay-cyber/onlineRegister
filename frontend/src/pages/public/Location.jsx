import React from "react";
import '../../css/AboutLocationHome.css'


function Location() {
  return (
    <div className="page-container">

      <div className="page-hero">
        <h1>Location of Our College</h1>

        <p>
          Our College is conveniently located in Ethiopia,Injibara and is
          accessible to students from different areas.
        </p>
      </div>

      <div className="page-section">

        <h2>Our Location</h2>

        <p>
          Our College is located approximately 30 kilometers from
          Bahir Dar and approximately 100 kilometers from Addis Ababa.
        </p>

        <p>
          The college location provides students with access to educational
          opportunities while maintaining a suitable environment for
          learning and academic development.
        </p>

      </div>

      <div className="page-section">

        <h2>Distance Information</h2>

        <div className="card-grid">

          <div className="common-card">
            <h3>From Bahir Dar</h3>
            <p>
              Approximately 30 kilometers from Bahir Dar.
            </p>
          </div>

          <div className="common-card">
            <h3>From Addis Ababa</h3>
            <p>
              Approximately 100 kilometers from Addis Ababa.
            </p>
          </div>

        </div>

      </div>

      <div className="page-section">

        <h2>Visiting the College</h2>

        <p>
          Students, parents, and visitors are welcome to visit the college
          for information about admission, academic programs, registration,
          and other college services.
        </p>

      </div>

    </div>
  );
}

export default Location;