import React, { useState } from 'react'
import '../../css/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Server message
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault()

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password || password.length < 8) {
      setPasswordError(
        'Password is required and must be at least 8 characters long'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    // STOP if frontend validation fails
    if (!isValid) {
      console.log('Form submission failed');
      return;
    }

    console.log('Form validation successful');

    // Send data to backend
    try {

      const response = await api.post('/login', {
        email: email,
        password: password
      });

      console.log("Backend output:", response.data);


      // Get user from backend
      const user = response.data.data.user;


      // Save token
      localStorage.setItem('token',response.data.data.token);
    


      // Save user
      localStorage.setItem('user',JSON.stringify(user));


      setMessage('User Login successfully');


      // =========================
      // ROLE BASED NAVIGATION
      // =========================

      if (user.role === "student") {

        navigate("/student/dashboard");

      }

      else if (user.role === "registrar") {

        navigate("/registrar/dashboard");

      }

      else if (user.role === "dean") {

        navigate("/dean/dashboard");

      }

    } catch (err) {

      console.log(err.response?.data);

    }

  };


  return (

    <div className='page'>

      <h1>{message}</h1>

      <form onSubmit={handleSubmit} className='form'>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        {emailError && (
          <p style={{ color: 'red' }}>
            {emailError}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        {passwordError && (
          <p style={{ color: 'red' }}>
            {passwordError}
          </p>
        )}

        <button type="submit" className='button'>
          Login
        </button>

        <p>
          Not Account before create ?
          <Link to={"/register"}>Create Account</Link>
        </p>

      </form>

    </div>

  );

}

export default Login;