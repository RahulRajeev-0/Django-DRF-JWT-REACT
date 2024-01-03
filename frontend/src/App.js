import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import { Provider } from "react-redux";
import './App.css';
import userStore from './Redux/userStore';
import UserLogin from './pages/user/UserLogin';
import UserHome from './pages/user/UserHome';


function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={userStore}>
          <Routes>
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/" element={<UserHome/>} />
          </Routes>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
