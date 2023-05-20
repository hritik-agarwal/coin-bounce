import {Navigate} from 'react-router-dom'

function Protected({isAuth, children}) {
  if (isAuth) return <>{children}</>
  return <Navigate to='/login' />
}
export default Protected
