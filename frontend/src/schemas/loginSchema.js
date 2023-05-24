import * as yup from 'yup'
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/

const loginSchema = yup.object({
  username: yup.string().required('username is required'),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordRegex, {
      message: 'user lowercase, uppercase and digits',
    })
    .required('password is required'),
})

export default loginSchema
