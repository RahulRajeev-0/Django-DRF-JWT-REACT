import React,{useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router'
import isAuthUser from '../utils/isAuthUser'

const PrivateRoutes = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);
    
    // jwt authorization checking , whether the user have access or user is loged in or not 
    useEffect(() => {
        const fetchData = async () => {
          const authInfo = await isAuthUser();
          setIsAuthenticated(authInfo.isAuthenticated);
          setLoading(false);
        };
        fetchData();
      }, []);
      
  

    if (isLoading){
        // handle login state , you might show a loading spinner 
        return <div>Loading .......</div>;
    }
    if (!isAuthenticated){
        return <Navigate to="/login" />
    }
    // all the above condition is false then , user is authenticated so he can access the page
    return children;

  
}

export default PrivateRoutes
