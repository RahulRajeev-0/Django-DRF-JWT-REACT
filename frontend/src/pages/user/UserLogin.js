
import React, { useEffect, useState } from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
import { jwtDecode } from "jwt-decode";





const UserLogin = () => {

    const {state} = useLocation();
    const [message, setmessage] = useState(null)
    const [formError, setFormError] = useState([])
    const baseURL='http://127.0.0.1:8000'
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(state){
          setmessage(state)
        }
        
        navigate('', {}); 
        
      }, [state,navigate])
      
      const handleLoginSubmit = async(event)=> {
        event.preventDefault();
        setFormError([])
        const formData = new FormData();
        formData.append("email", event.target.email.value);
        formData.append("password", event.target.password.value);
        try {
          const res = await axios.post(baseURL+'/api/user/login/', formData)
          if(res.status === 200){
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            console.log(res.data);
            dispatch(
              set_Authentication({
                name: jwtDecode(res.data.access).first_name,
                isAuthenticated: true,
                isAdmin:res.data.isAdmin
              })
            );
            navigate('/')
            return res
          }  
          
        }
        catch (error) {
          console.log(error);
          if (error.response.status===401)
          {
           
            setFormError(error.response.data)
          }
          else
          {
            console.log(error);
      
          }
        }
      }

  return (
       <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">
                    <form onSubmit={handleLoginSubmit}>

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
               
                  <div className="col-md-8 col-lg-7 col-xl-6">
                        {message && <div className="alert alert-primary" role="alert" data-mdb-color="dark">
                        {message}
                    </div>}
                    </div>

                  <div className="form-outline form-white mb-4">
                    <input type="text" id="typeEmailX" className="form-control form-control-lg" name='email' />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" className="form-control form-control-lg" name='password'/>
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                  <ul className='text-danger'>
             {formError['detail'] && <li>
             {formError['detail']}
              </li>}
            </ul>
                    </form>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>

                </div>

                <div>
                  <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default UserLogin
