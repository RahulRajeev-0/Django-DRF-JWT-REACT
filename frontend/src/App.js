import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import { Provider } from "react-redux";
import './App.css';
import userStore from './Redux/userStore';
import UserLogin from './pages/user/UserLogin';
import UserHome from './pages/user/UserHome';
import UserWrapper from './Components/user/UserWrapper/UserWrapper';
import AdminWrapper from './Components/admin/adminWrapper/AdminWrapper'


function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={userStore}>
          <Routes>
            <Route path='/*' element={<UserWrapper/>} >
              
            </Route>
            {/* <Route path="/login" element={<UserLogin/>} />
            <Route path="/" element={<UserHome/>} /> */}
            <Route path="admin/*" element={<AdminWrapper />}></Route>

          </Routes>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
