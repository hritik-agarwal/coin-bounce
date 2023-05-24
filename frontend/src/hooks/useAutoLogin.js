import {useState, useEffect} from 'react'
import {setUser} from '../store/userSlice'
import {useDispatch} from 'react-redux'
import axios from 'axios'

function useAutoLogin() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const autoLoginApiCall = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,
          {},
          {withCredentials: true}
        )
        console.log({response})
        if (response.status === 201) {
          const user = {
            _id: response.data.user._id,
            email: response.data.user.email,
            username: response.data.user.username,
            auth: response.data.auth,
          }
          dispatch(setUser(user))
        }
      } catch (error) {
        //
      } finally {
        setLoading(false)
      }
    }
    autoLoginApiCall()
  }, [])

  return loading
}

export default useAutoLogin
