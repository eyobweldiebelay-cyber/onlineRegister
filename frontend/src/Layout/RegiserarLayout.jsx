import DashboardNavbar from "../components/DashbaordNavbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import '../css/student.css';
import DashboardFooter from "../components/DashboardFooter";
function RegistrarLayout() {
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
  <DashboardFooter />
    </>
  );
}

export default RegistrarLayout;