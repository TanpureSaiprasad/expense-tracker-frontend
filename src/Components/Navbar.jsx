import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "../Styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">ExpenseTracker</h2>

      {/* Desktop links */}
      <div className="nav-links desktop">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
      </div>

      {/* Desktop logout */}
      <button className="logout-btn desktop" onClick={handleLogout}>
        Logout
      </button>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <FiX /> : <FiMenu />}
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu">
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
