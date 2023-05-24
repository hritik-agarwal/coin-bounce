import * as yup from 'yup'

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/

const signupSchema = yup.object({
  name: yup.string().min(1).max(30).required('name is required'),
  email: yup
    .string()
    .email('enter a valid email')
    .required('email is required'),
  username: yup.string().min(5).max(30).required('username is required'),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordRegex, {
      message: 'user lowercase, uppercase and digits',
    })
    .required('password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password must match')
    .required('password is required'),
})

export default signupSchema
