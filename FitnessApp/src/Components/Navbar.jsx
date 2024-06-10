import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <header className="nav-container">
      <h1 className="nav-h1">Achievement Hunter</h1>
      <nav className="routes">
        <ul className="nav-list">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to={user ? "/profile" : "/"}
            >
              {user ? "Profile" : "Home"}
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/workouts"
            >
              Workouts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/milestones"
            >
              Milestones
            </NavLink>
          </li>
          {user && (
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
