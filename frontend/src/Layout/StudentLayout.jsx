import DashboardNavbar from "../components/DashbaordNavbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
 import '../css/student.css';

function StudentLayout() {
  return (
    <>
    
      <DashboardNavbar />

    <div className="all-aside-main">
  <div className="aside">
    <Sidebar />
  </div>

  <main className="main">
    <Outlet />
  </main>
</div>
    </>
  );
}

export default StudentLayout;