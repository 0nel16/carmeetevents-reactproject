import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BrandNavLink } from "./BrandNavLink";
import { useAuthContext } from "../../features/Auth/AuthContext";
import styles from "./Nav.module.css";

export function Nav() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/", { replace: true });
  }

  return (
    <nav className={styles.nav} aria-label="main menu">
      <Link to="/" className={styles.logo}>
        CarMeet Events
      </Link>
      <menu className={styles.mainMenu}>
        <li>
          <BrandNavLink to="/events">Events</BrandNavLink>
        </li>
        {user && (
          <>
            <li>
              <BrandNavLink to="/events/add">Add Event</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="/my-events">My Events</BrandNavLink>
            </li>
          </>
        )}
        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink className={styles.special} to="/login">
                Login
              </BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="/register">Register</BrandNavLink>
            </li>
          </>
        )}
        {user && (
          <li className={styles.pushRight}>
            <span
              className={styles.userName}
              onClick={() => navigate("/profile")}
              role="button"
              tabIndex={0}
            >
              Welcome, {user.firstName}!
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              Logout
            </button>
          </li>
        )}
      </menu>
      <button
        className={styles.burger}
        aria-label="Open menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ☰
      </button>
      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/events" onClick={() => setIsOpen(false)}>
            Events
          </Link>
          {user && (
            <>
              <Link to="/events/add" onClick={() => setIsOpen(false)}>
                Add Event
              </Link>
              <Link to="/my-events" onClick={() => setIsOpen(false)}>
                My Events
              </Link>
              <button
                type="button"
                className={styles.mobileLogout}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  logout();
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
