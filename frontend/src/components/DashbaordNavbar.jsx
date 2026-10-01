
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/DashboardNavbar.css";

function DashboardNavbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="dashboard-navbar">

      {/* System Logo */}
      <div className="dashboard-brand">

        <div className="system-logo">
          OS
        </div>

        <div className="system-name">
          <strong>Online Student</strong>
          <span>Register System</span>
        </div>

      </div>


      {/* User Profile */}
      <div className="dashboard-user">

        <div className="user-image">
          {user?.image ? (
            <img src={user.image} alt="Profile" />
          ) : (
            <span>
              {user?.firstname?.charAt(0)?.toUpperCase() ||
                user?.username?.charAt(0)?.toUpperCase() ||
                "U"}
            </span>
          )}
        </div>

        <div className="user-info">

          <strong>
            {user?.firstname || user?.username || "User"}
          </strong>

          <span>
            {user?.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : "Student"}
          </span>

        </div>

        <button
          onClick={handleLogout}
          className="button-logout"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default DashboardNavbar;

