import { Link } from 'react-router';
import { BrandNavLink } from './BrandNavLink';

import styles from './Nav.module.css';

export function Nav() {
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
          <BrandNavLink to="/todos">Todos</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="/boardgames">Boardgames</BrandNavLink>
        </li>
        <li className={styles.pushRight}>
          <BrandNavLink className={styles.special} to="/login">Login</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="/register">Register</BrandNavLink>
        </li>
      </menu>
    </nav>
  );
}
