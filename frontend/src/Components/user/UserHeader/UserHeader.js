import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'
import { set_Authentication } from '../../../Redux/authentication/authenticationSlice'


const UserHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const authentication_user = useSelector(state=>state.authentication_user)

  const handleLogout = () => {
      // Clear local storage
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    
      // Dispatch a Redux action to reset authentication state
      dispatch(
        set_Authentication({
          name: '',
          isAuthenticated: false,
          isAdmin: false
        })
      );
    
      // Navigate to the login or home page, depending on your app structure
      navigate('/login'); // Adjust the route as needed
    };
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>Log Out</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    
  )
}

export default UserHeader
