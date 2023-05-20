import {NavLink} from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const isAuthenticated = false
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.logo}>
          CoinBounce
        </NavLink>
        <NavLink className={({isActive}) => isActive && styles.active} to='/'>
          Home
        </NavLink>
        <NavLink
          to='crypto'
          className={({isActive}) => isActive && styles.active}>
          Cryptocurrencies
        </NavLink>
        <NavLink
          to='blogs'
          className={({isActive}) => isActive && styles.active}>
          Blogs
        </NavLink>
        <NavLink
          to='submit'
          className={({isActive}) => isActive && styles.active}>
          Submit a Blog
        </NavLink>
        {isAuthenticated ? (
          <NavLink
            to='signout'
            className={({isActive}) => isActive && styles.active}>
            <button className={`${styles.button} ${styles.signout}`}>
              Sign Out
            </button>
          </NavLink>
        ) : (
          <div>
            <NavLink
              to='login'
              className={({isActive}) => isActive && styles.active}>
              <button className={`${styles.button} ${styles.login}`}>
                Log In
              </button>
            </NavLink>
            <NavLink
              to='signup'
              className={({isActive}) => isActive && styles.active}>
              <button className={`${styles.button} ${styles.signup}`}>
                Sign Up
              </button>
            </NavLink>
          </div>
        )}
      </nav>
      <div className={styles.divider}></div>
    </>
  )
}
export default Navbar
