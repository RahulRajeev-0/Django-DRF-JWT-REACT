import {jwtDecode} from "jwt-decode";
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

const updateAdminToken = async () => {
    
    const refresh = localStorage.getItem('refresh');

    try{
        const res = await axios.post(baseURL+"api/user/token/refresh/",{
            'refresh':refresh
        });
        if (res.status === 200){
            localStorage.setItem('access', res.data.access )
            localStorage.setItem('refresh', res.data.refresh )
            return true;
        }else{
            return false
        }

    }catch(error){
        return false;
    }

};

const fetchisAdmin = async () => {
    const token = localStorage.getItem('access');
    
    try {
        const res = await axios.get(baseURL + '/api/user/details/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return res.data.is_superuser; // Return directly from the function

    } catch (error) {
        return false;
    }
};


// function reposible for checking whether token exist or not , if exist check its expiration , if expired updating the token
const isAuthAdmin = async () => {
    const accessToken = localStorage.getItem("access");
    // check if the access token exist or not
    if (!accessToken) {
        return { 'name': null, isAuthenticated: false, isAdmin: false };
    }

    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);

    // checking the access token expiration date
    if (decoded.exp > currentTime) {

        // checking if the user is superuser or not 
        let checkAdmin = await fetchisAdmin(); // Await the result 
        return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };

    } // if the token expired then updating the token  
    else {
        const updateSuccess = await updateAdminToken();

        if (updateSuccess) {
            // checking the user is superuser or not 
            let decoded = jwtDecode(accessToken);
            let checkAdmin = await fetchisAdmin(); // Await the result
            return { 'name': decoded.first_name, isAuthenticated: true, isAdmin: checkAdmin };
        } // if not clearing the data  
        else {
            return { 'name': null, isAuthenticated: false, isAdmin: false };
        }
    }
};

export default isAuthAdmin;



