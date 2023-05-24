import {NavLink, Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import styles from './Navbar.module.css'
import {signout} from '../../api/internal'
import {resetUser} from '../../store/userSlice'
import {useState} from 'react'

function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.user.auth)

  const handleSignOut = async () => {
    await signout()
    dispatch(resetUser())
    Navigate('/')
  }

  const handleLinkClick = () => {
    setShowMenu(false)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.logo}>
          CoinForum
        </NavLink>
        <NavLink
          to='/'
          className={({isActive}) => (isActive ? styles.active : undefined)}>
          Home
        </NavLink>
        <NavLink
          to='crypto'
          className={({isActive}) => (isActive ? styles.active : undefined)}>
          Cryptocurrencies
        </NavLink>
        <NavLink
          to='blogs'
          className={({isActive}) => (isActive ? styles.active : undefined)}>
          Blogs
        </NavLink>
        <NavLink
          to='submit'
          className={({isActive}) => (isActive ? styles.active : undefined)}>
          Submit a Blog
        </NavLink>
        {isAuthenticated ? (
          <NavLink
            to='signout'
            className={({isActive}) => (isActive ? styles.active : undefined)}>
            <button
              onClick={handleSignOut}
              className={`${styles.button} ${styles.signout}`}>
              Sign Out
            </button>
          </NavLink>
        ) : (
          <div>
            <NavLink
              to='login'
              className={({isActive}) =>
                isActive ? styles.active : undefined
              }>
              <button className={`${styles.button} ${styles.login}`}>
                Log In
              </button>
            </NavLink>
            <NavLink
              to='signup'
              className={({isActive}) =>
                isActive ? styles.active : undefined
              }>
              <button className={`${styles.button} ${styles.signup}`}>
                Sign Up
              </button>
            </NavLink>
          </div>
        )}
      </nav>
      <nav className={styles.navbarMobile}>
        <NavLink to='/' className={styles.logo}>
          CoinForum
        </NavLink>
        <div
          onClick={() => {
            setShowMenu(prev => !prev)
          }}
          className={styles.menu}>
          {!showMenu ? '=' : 'X'}
        </div>
        <div
          className={`${styles.navbarMenuList} ${
            !showMenu ? styles.hidden : undefined
          }`}>
          <NavLink
            to='/'
            onClick={handleLinkClick}
            className={({isActive}) => (isActive ? styles.active : undefined)}>
            Home
          </NavLink>
          <NavLink
            to='crypto'
            onClick={handleLinkClick}
            className={({isActive}) => (isActive ? styles.active : undefined)}>
            Cryptocurrencies
          </NavLink>
          <NavLink
            to='blogs'
            onClick={handleLinkClick}
            className={({isActive}) => (isActive ? styles.active : undefined)}>
            Blogs
          </NavLink>
          <NavLink
            to='submit'
            onClick={handleLinkClick}
            className={({isActive}) => (isActive ? styles.active : undefined)}>
            Submit a Blog
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to='signout'
              onClick={handleLinkClick}
              className={({isActive}) =>
                isActive ? styles.active : undefined
              }>
              <button
                onClick={handleSignOut}
                className={`${styles.button} ${styles.signout}`}>
                Sign Out
              </button>
            </NavLink>
          ) : (
            <div className={styles.signInButton}>
              <NavLink
                to='login'
                onClick={handleLinkClick}
                className={({isActive}) =>
                  isActive ? styles.active : undefined
                }>
                <button className={`${styles.button} ${styles.login}`}>
                  Log In
                </button>
              </NavLink>
              <NavLink
                to='signup'
                onClick={handleLinkClick}
                className={({isActive}) =>
                  isActive ? styles.active : undefined
                }>
                <button className={`${styles.button} ${styles.signup}`}>
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      <div className={styles.divider}></div>
    </>
  )
}
export default Navbar
