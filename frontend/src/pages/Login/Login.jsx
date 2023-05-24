import TextInput from '../../components/TextInput/TextInput'
import styles from './Login.module.css'
import loginSchema from '../../schemas/loginSchema'
import {useFormik} from 'formik'
import {login} from '../../api/internal'
import {setUser} from '../../store/userSlice'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const {values, touched, handleBlur, handleChange, errors} = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
  })

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    }
    const response = await login(data)
    if (response.status === 200) {
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      }
      dispatch(setUser(user))
      navigate('/')
    } else if (response.code === 'ERR_BAD_REQUEST') {
      setError(response.response.data.message)
    } else {
      console.log(response)
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>Log in to your account</div>
      <TextInput
        type='text'
        name='username'
        value={values.username}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='username'
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
        type='password'
        name='password'
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='password'
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password || errors.password}
      />
      <button
        type='submit'
        onClick={handleLogin}
        className={styles.loginButton}
        disabled={
          !values.username ||
          !values.password ||
          errors.username ||
          errors.password
        }>
        Log In
      </button>
      <span>
        Don't have an account?{' '}
        <button
          onClick={() => navigate('/signup')}
          className={styles.createAccount}>
          Register
        </button>
      </span>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  )
}
export default Login
