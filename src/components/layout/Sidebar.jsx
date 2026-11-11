import { NavLink, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiBookOpen,
  FiBookmark,
  FiUser,
  FiSettings,
  FiShield,
  FiGrid,
  FiX
} from "react-icons/fi";

import { useLMS } from "../../context/LMSContext";

const Sidebar = ({ open, onClose }) => {
  const { user, switchRole } = useLMS();
  const navigate = useNavigate();

  const isAdmin = user.role === "admin";

  const studentLinks = [
    {
      path: "/",
      label: "Dashboard",
      icon: <FiGrid />
    },
    {
      path: "/catalogue",
      label: "Course catalogue",
      icon: <FiBookOpen />
    },
    {
      path: "/my-courses",
      label: "My courses",
      icon: <FiBookmark />
    },
    {
      path: "/profile",
      label: "My profile",
      icon: <FiUser />
    }
  ];

  const adminLinks = [
    {
      path: "/admin/courses",
      label: "Course management",
      icon: <FiShield />
    },
    {
      path: "/profile",
      label: "My profile",
      icon: <FiUser />
    }
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  const handleLinkClick = (link) => {
    if (link.preview) {
      switchRole("student");
      navigate("/");
    }

    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <FiBookOpen />
          </div>

          <span>LearnSpace</span>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">WORKSPACE</span>

          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end={link.path === "/"}
              onClick={() => handleLinkClick(link)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="topbar-profile sidebar-profile">
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

      </aside>
    </>
  );
};

export default Sidebar;