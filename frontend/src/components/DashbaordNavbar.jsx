import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

      <h2 className="logo">
        Online Student Register System
      </h2>

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

        <strong>
          {user?.firstname || user?.username}
        </strong>

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