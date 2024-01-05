import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Utility functions
import isAuthUser from "../../../utils/isAuthUser";

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from "../../../Redux/authentication/authenticationSlice"; 
import { set_user_basic_details } from "../../../Redux/userBasicDetails/userBasicDetailsSlice"; 

// API requests
import axios from 'axios';

// Components
import UserLogin from "../../../pages/user/UserLogin";
import UserHome from "../../../pages/user/UserHome"; 
import UserHeader from "../UserHeader/UserHeader";
import PrivateRoutes from "../../PrivateRoutes";
import UserRegister from "../../../pages/user/UserRegister";

function UserWrapper() {
    const dispatch = useDispatch();

    const authentication_user = useSelector(state=>state.authentication_user)


    // checking if the user is authenticated and authorized 
    const checkAuth = async()=>{
        const isAuthenticated = await isAuthUser();
        dispatch(
            set_Authentication({
                name:isAuthenticated.name,
                isAuthenticated:isAuthenticated.isAuthenticated
            })
        );
    };

  const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access');

  const fetchUserData = async ()=>{
    try{
        const res = await axios.get(baseURL+'/api/user/details/',{headers:{
            'authorization':`Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(res =>{
            dispatch(
                set_user_basic_details({
                    name:res.data.first_name,
                    profile_pic:res.data.profile_pic
                })
            );
        })
    }
    catch(error){
        console.log(error);
    }
  };

  useEffect(()=>{
    if(!authentication_user.name){
        checkAuth();
    }
    if (authentication_user.isAuthenticated){
        fetchUserData();
    }
  },[authentication_user])

  return(
    <>
  {/* <UserHeader/> */}
  <Routes>
    <Route path="/" element={<UserHome/>} />
    <Route path="login" element={<UserLogin/>}/>
    <Route path="register" element={<UserRegister/>}/>
    {/* <Route path="profile" element={
      <PrivateRoute>
        <UserProfile/>
      </PrivateRoute>
    }/> */}
  </Routes>
</>

  )

}

export default UserWrapper;