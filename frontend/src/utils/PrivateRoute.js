import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    let {authTokens} = useContext(AuthContext)
    return(
        <>
          {!authTokens ? <Navigate to="/login"/> : children}
        </>
    )
}

export default PrivateRoute;
