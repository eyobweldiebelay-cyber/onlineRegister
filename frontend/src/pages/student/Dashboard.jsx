import React, { useEffect, useState } from "react";
import api from "../../api";
import '../../css/Dashboard.css';
function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState("");


  const getDashboard = async () => {

    try {

      const response = await api.get("/student");

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
    return (
      <div>
        {message || "Loading..."}
      </div>
    );
  }


  const studentName =`${dashboard.student.first_name} ${dashboard.student.last_name}`;


  const applicationStatus = dashboard.application?.status || "Not Started";


  const documentsUploaded = dashboard.documents.uploaded;


  const documentsRequired =dashboard.documents.required;


  const paymentStatus = dashboard.payment?.payment_status || "Pending";


  return (
    <div className="all-continer">

      <h2 className="page-title" >STUDENT DASHBOARD</h2>

      <h3 className="h3">
        Welcome, {studentName}
      </h3>


      {/* APPLICATION */}

      <div className="appliction">

        <h3 className="h3">Application</h3>

        <p className="p">
          {applicationStatus}
        </p>

      </div>


      {/* DOCUMENTS */}

      <div>

        <h3>Documents</h3>

        <p className="p">
          {documentsUploaded} / {documentsRequired}
        </p>

      </div>


      {/* PAYMENT */}

      <div className="payment">

        <h3 className="h3">Payment</h3>

        <p className="p">
          {paymentStatus}
        </p>

      </div>


      {/* REGISTRATION STATUS */}

      <div className="register">

        <h3 className="h3">Registration Status</h3>

        <p className="p">
          {applicationStatus}
        </p>

      </div>


      {/* EXTRA INFORMATION */}

      {dashboard.application && (
        <div className="info" >

          <p className="p">
            Program:
            {" "}
            {dashboard.application.program_name}
          </p>

          <p className="p">
            Academic Year:
            {" "}
            {dashboard.application.academic_year}
          </p>

        </div>
      )}

    </div>
  );
}

export default Dashboard;