import { useLocation, useNavigate } from "react-router-dom";

import {
  FiMenu,
  FiBell,
  FiChevronDown,
  FiShield,
  FiBookOpen
} from "react-icons/fi";

import { useLMS } from "../../context/LMSContext";

const Topbar = ({ onMenuClick }) => {
  const { user, switchRole } = useLMS();

  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Student portal";
    if (path === "/admin" || path === "/admin/courses") {
      return "Administration";
    }
    if (path === "/catalogue") return "Course catalogue";
    if (path === "/my-courses") return "My courses";
    if (path === "/profile") return "My profile";
    if (path.includes("/lesson/")) return "Learning center";
    if (path.includes("/quiz/")) return "Course quiz";
    if (path.includes("/courses/")) return "Course details";

    return "Learning workspace";
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;

    switchRole(selectedRole);

    if (selectedRole === "admin") {
      navigate("/admin/courses");
    } else {
      navigate("/");
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <FiMenu />
        </button>

        <div className="breadcrumb">
          <span>Learning workspace</span>
          <span className="breadcrumb-divider">/</span>
          <strong>{getTitle()}</strong>
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="topbar-icon notification-btn"
          aria-label="Notifications"
        >
          <FiBell />
          <span />
        </button>

        <label className="role-switch">
          {user.role === "admin" ? <FiShield /> : <FiBookOpen />}

          <select
            value={user.role}
            onChange={handleRoleChange}
            aria-label="Switch workspace"
            className="role"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <FiChevronDown className="role-chevron" />
        </label>

        <div className="topbar-profile">
          <div className="avatar">
            AK
          </div>

          <div className="topbar-user-details">
            <strong>{user.name}</strong>
            <small>
              {user.role === "admin"
                ? "Administrator"
                : "Student account"}
            </small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;