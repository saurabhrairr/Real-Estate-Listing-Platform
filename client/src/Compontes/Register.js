

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Register.css"

const Register = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const handleSignup = async () => {
    try {
     
      const signupResponse = await axios.post('http://localhost:8004/api/user/Register', {
        username,
        password,
      });
  

      Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'You have successfully signed up. Please log in.',
      });
  
   
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error.response?.data?.error || 'Internal Server Error');
  

      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.response?.data?.error || 'Internal Server Error',
      });
    }
  };
  
  const isSignupPage = location.pathname === '/Loginpage';

  return (
    <div
      className={`container1 d-flex justify-content-center align-items-center vh-100 ${
        isSignupPage ? 'signup-page' : ''
      }`}
    >
      <div className="form">
        <h2 className="mb-4">Signup</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Register;






