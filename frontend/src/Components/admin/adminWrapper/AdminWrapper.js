import React, { useEffect } from 'react';
import AdminLogin from '../../../pages/admin/AdminLogin';
import AdminHome from '../../../pages/admin/AdminHome';
import AdminPrivateRoutes from '../../AdminPrivateRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from '../../../Redux/authentication/authenticationSlice';
import { set_user_basic_details } from '../../../Redux/userBasicDetails/userBasicDetailsSlice';
import axios from 'axios';
import isAuthAdmin from '../../../utils/isAuthAdmin';
import { Routes,Route } from 'react-router';


function AdminWrapper(){
    const dispatch = useDispatch();
    const authentication_user = useSelector(state => state.authentication_user);

    const baseURL = 'http://127.0.0.1:8000';
    const token = localStorage.getItem('access');

    // function for getting the user data if user is logged in 
    const checkAuthAndFetchUserData = async () => {
        try {
                                    // returns an object with , name,isathutenticated , isadmin
          const isAuthenticated = await isAuthAdmin();
          //setting the values to the store slice 
          dispatch(
            set_Authentication({
              name: isAuthenticated.name,
              isAuthenticated: isAuthenticated.isAuthenticated,
              isAdmin: isAuthenticated.isAdmin,
            })
          );
    // if user is authenticated sending request to collects the data 
          if (isAuthenticated.isAuthenticated) {
            const res = await axios.get(baseURL + '/api/user/details/', {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            // getting and storing the user profile 
            dispatch(
              set_user_basic_details({
                name: res.data.first_name,
                profile_pic: res.data.profile_pic,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        if (!authentication_user.name) {
          checkAuthAndFetchUserData();
        }
      }, []);

      return (
        <>
            <Routes>
                 <Route path="login" element={<AdminLogin />} />
                 <Route path="/" element={<AdminHome/>} />
            </Routes>
        
        </>
      )
    

}
export default AdminWrapper;