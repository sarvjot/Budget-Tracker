import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {authTokens, logoutUser} = useContext(AuthContext)

  return (
    <div>
      <Link to="/">Dashboard</Link>
      {
        authTokens 
        ? 
        <button onClick={logoutUser}>Logout</button>
        : 
        <> 
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      }
      <Link to="/create-entry">Create Entry</Link>
    </div>
  )
}

export default Header
