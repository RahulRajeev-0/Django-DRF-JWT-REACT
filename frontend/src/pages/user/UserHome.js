import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserHeader from '../../Components/user/UserHeader/UserHeader';
import HomePage from '../../Components/user/Home/HomePage';
const UserHome = () => {
    
    const authentication_user = useSelector(state=>state.authentication_user)

    
  return (
    <>
    <UserHeader/>
    <HomePage/>
  </>
  )
}

export default UserHome
