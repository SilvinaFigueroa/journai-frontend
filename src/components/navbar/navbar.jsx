import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

const Navbar = () => {

  const [menuActive, setMenuActive] = useState(false);

  // toggle for hamburguer menu on mobile
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  }

  return (
    <nav className={styles.Navbar}>

      <div className={styles.NavbarContainer}>

        <a href="/" className={styles.NavbarLogo}>
          <img src="src/images/logo.jpg" alt="Journ AI Logo" className={styles.NavbarLogoImage} />
        </a>
        <button className={styles.NavbarToggle} onClick={toggleMenu}>
          {/* hamburger menu icon */}
          &#9776;
        </button>
        {/* Navbar links with conditional rendering -mobile- */}
        <ul className={`${styles.NavbarMenu} ${menuActive ? styles.active : ''}`}>
          <li className={styles.NavbarItem}>
            <a href="/journal" className={styles.NavbarLink}>Journal</a>
          </li>
          <li className={styles.NavbarItem}>
            <a href="/insights" className={styles.NavbarLink}>Insights</a>
          </li>
          <li className={styles.NavbarItem}>
            <Link to="/login" className={styles.NavbarButton}>Login</Link>
          </li>
          <li className={styles.NavbarItem}>
            <Link to="/signup" className={styles.NavbarButtonPrimary}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default Navbar
