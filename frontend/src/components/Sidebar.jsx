import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../css/Navbar.css'
function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="aside-bar">
<div className=" navlink">
      {user?.role === "student" && (
        <>
          <NavLink to="/student/dashboard">Dashboard</NavLink>
          <NavLink to="/student/profile">Profile</NavLink>
          <NavLink to="/student/application">Application</NavLink>
          <NavLink to="/student/documents">Documents</NavLink>
          <NavLink to="/student/payment">Payment</NavLink>
          <NavLink to="/student/comments">Comments</NavLink>
        </>
      )}

      {user?.role === "registrar" && (
        <>
          <NavLink to="/registrar/dashboard">Dashboard</NavLink>
          <NavLink to="/registrar/applications">Applications</NavLink>
          <NavLink to="/registrar/students">Students</NavLink>
          <NavLink to="/registrar/comments">Comments</NavLink>
          <NavLink to="/registrar/reports">Reports</NavLink>
        </>
      )}

      {user?.role === "dean" && (
        <>
          <NavLink to="/dean/dashboard">Dashboard</NavLink>
          <NavLink to="/dean/students">Students</NavLink>
          <NavLink to="/dean/payments">Payments</NavLink>
          <NavLink to="/dean/comments">Comments</NavLink>
          <NavLink to="/dean/reports">Reports</NavLink>
        </>
      )}
 </div>
    </aside>
  );
}

export default Sidebar;