import Home from './pages/Home/Home'
import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Error from './pages/Error/Error'
import Protected from './components/Protected/Protected'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Crypto from './pages/Crypto/Crypto'
import Blog from './pages/Blog/Blog'
import SubmitBlog from './pages/SubmitBlog/SubmitBlog'
import BlogDetail from './pages/BlogDetail/BlogDetail'
import BlogUpdate from './pages/BlogUpdate/BlogUpdate'
import useAutoLogin from './hooks/useAutoLogin'
import Loader from './components/Loader/Loader'

function App() {
  const isAuth = useSelector(state => state.user.auth)
  const loading = useAutoLogin()

  if (loading) {
    return <Loader text={'...'} />
  }

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              }
            />
            <Route
              path='crypto'
              element={
                <div className={styles.main}>
                  <Crypto />
                </div>
              }
            />
            <Route
              path='blogs'
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <Blog />
                  </div>
                </Protected>
              }
            />
            <Route
              path='blogs/:id'
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <BlogDetail />
                  </div>
                </Protected>
              }
            />
            <Route
              path='blogs/update/:id'
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <BlogUpdate />
                  </div>
                </Protected>
              }
            />
            <Route
              path='submit'
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <SubmitBlog />
                  </div>
                </Protected>
              }
            />
            <Route
              path='login'
              element={
                <div className={styles.main}>
                  <Login />
                </div>
              }
            />
            <Route
              path='signup'
              element={
                <div className={styles.main}>
                  <Signup />
                </div>
              }
            />
            <Route
              path='*'
              element={
                <div className={styles.main}>
                  <Error />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
