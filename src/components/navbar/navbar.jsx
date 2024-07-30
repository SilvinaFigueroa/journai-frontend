import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/auth/auth_context'

import styles from './Navbar.module.css'

const Navbar = () => {

  const [menuActive, setMenuActive] = useState(false);

  const { user, logOut } = useAuth()

  // Include logOut when user is logged in
  const handleLogout = () => {
    logOut();
  }

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
          {/* Conditional rendering links for logged user */}
          {user && (
            <>
              <li className={styles.NavbarItem}>
                <a href="/journal" className={styles.NavbarLink}>Journal</a>
              </li>
              <li className={styles.NavbarItem}>
                <a href="/insights" className={styles.NavbarLink}>Insights</a>
              </li>
            </>
          )}
        </ul>

        {/* conditinal rendering: user logged - name + logOut button, else login + signUp button */}
        <div className={styles.NavbarButtons}>
          {user ? (
            <>
              <span className={styles.NavbarUserName}>{user.firstName}</span>
              <button onClick={handleLogout} className={styles.NavbarButton}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.NavbarButton}>Login</Link>
              <Link to="/signup" className={styles.NavbarButtonPrimary}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav >
  )
}

export default Navbar
