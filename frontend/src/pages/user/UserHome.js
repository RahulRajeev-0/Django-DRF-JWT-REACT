import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
// import UserHeader from '../../Components/user/UserHeader/UserHeader';

const UserHome = () => {
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
    
    <div className="container mt-5">
    <div className="row">
       
      <div className="col-md-8 col-lg-7 col-xl-6">
        <h1>Welcome {authentication_user.name} Your React App</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  </div>
  )
}

export default UserHome
