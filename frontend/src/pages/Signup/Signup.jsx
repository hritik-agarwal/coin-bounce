import {useState} from 'react'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styles from './Signup.module.css'
import {signup} from '../../api/internal'
import {setUser} from '../../store/userSlice'
import signupSchema from '../../schemas/signupSchema'
import TextInput from '../../components/TextInput/TextInput'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const {values, touched, handleBlur, handleChange, errors} = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
  })

  const handleSignup = async () => {
    const data = {
      name: values.name,
      email: values.email,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }
    const response = await signup(data)
    if (response.status === 201) {
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

  console.log(
    errors.name ||
      errors.email ||
      errors.username ||
      errors.password ||
      errors.confirmPassword ||
      values.name === '' ||
      values.email === '' ||
      values.username === '' ||
      values.password === '' ||
      values.confirmPassword === ''
  )

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Create an account</div>
      <TextInput
        type='text'
        name='name'
        value={values.name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='name'
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />
      <TextInput
        type='text'
        name='email'
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='email'
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
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
        errormessage={errors.password}
      />
      <TextInput
        type='password'
        name='confirmPassword'
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='confirmPassword'
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />
      <button
        type='submit'
        onClick={handleSignup}
        className={styles.signupButton}
        disabled={
          errors.name ||
          errors.email ||
          errors.username ||
          errors.password ||
          errors.confirmPassword ||
          !values.name ||
          !values.email ||
          !values.username ||
          !values.password ||
          !values.confirmPassword
        }>
        Sign Up
      </button>
      <span>
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className={styles.loginAccount}>
          Log In
        </button>
      </span>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  )
}
export default Signup
