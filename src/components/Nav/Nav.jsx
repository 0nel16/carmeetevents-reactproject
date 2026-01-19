import { Link } from 'react-router-dom';
import { BrandNavLink } from './BrandNavLink';
import { useAuthContext } from '../../features/Auth/AuthContext';

import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuthContext();

  return (
    <nav className={styles.nav} aria-label="main menu">
      <Link to="/">
        <img
          src="https://scoalainformala.ro/wp-content/uploads/2021/07/Logo-scoala-informala-de-it-alb.png"
          alt="Scoala informala logo"
          height="60"
        />
      </Link>

      <menu className={styles.mainMenu}>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="/events">Events</BrandNavLink>
        </li>

        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink className={styles.special} to="/login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="/register">Register</BrandNavLink>
            </li>
          </>
        )}

        {user && (
          <li className={styles.pushRight}> 
            Welcome, {user.firstName}!
            <a href="/" onClick={(e) => {
              e.preventDefault();
              logout();
            }}>Logout</a>
          </li>
        )}
      </menu>
    </nav>
  );
}
