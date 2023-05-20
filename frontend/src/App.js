import Home from './pages/Home/Home'
import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Error from './pages/Error/Error'
import Protected from './components/Protected/Protected'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const isAuth = false
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
              element={<div className={styles.main}>Cryto Page</div>}
            />
            <Route
              path='blogs'
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>Blogs Page</div>
                </Protected>
              }
            />
            <Route
              path='submit'
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>Submit a Blog Page</div>
                </Protected>
              }
            />
            <Route
              path='login'
              element={<div className={styles.main}>Log in Page</div>}
            />
            <Route
              path='signup'
              element={<div className={styles.main}>Sign Up Page</div>}
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
