import React, { useEffect, useState } from "react";
import api from "../../api";
import '../../css/Dashboard.css';
function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState("");

  const getDashboard = async () => {

    try {

      const response = await api.get("/registrar");

      setDashboard(response.data.dashboard);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Failed to load dashboard"
      );

    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (!dashboard) {
    return <div>{message || "Loading..."}</div>;
  }

  const counts = dashboard.counts;

  return (
    <div>

      <h3>REGISTRAR DASHBOARD</h3>


      <div>
        <strong className="strong">Total Applications *</strong>
        <p className="p">{counts.total || 0}</p>
      </div>

      <div>
        <strong className="strong">Pending Review *</strong>
        <p className="p">{counts.pending || 0}</p>
      </div>

      <div>
        <strong className="strong">Approved *</strong>
        <p>{counts.approved || 0}</p>
      </div>

      <div>
        <strong className="strong">Rejected *</strong>
        <p>{counts.rejected || 0}</p>
      </div>

      <h3 className="h3">Recent Applications *</h3>

      {dashboard.applications.length === 0 ? (

        <p className="p">No applications found.</p>

      ) : (

        <table border={1} className="table">

          <thead>
            <tr>
              <th>Student Name</th>
              <th>Department</th>
              <th>Academic Year</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {dashboard.applications.map((application) => (

              <tr key={application.application_id}>

                <td>
                  {application.student_name}
                </td>

                <td>
                  {application.program_name}
                </td>

                <td>
                  {application.academic_year}
                </td>

                <td>
                  {application.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default Dashboard;