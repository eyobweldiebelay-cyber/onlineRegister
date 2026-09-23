import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Login.css';
import api from '../../api';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    // Stop if validation fails
    if (!isValid) {
      console.log('Form submission failed');
      return;
    }

    console.log('Form validation successful');

    try {
      // Send login request
      const response = await api.post('/login', {
        email: email,
        password: password
      });

      console.log('Backend output:', response.data);

      // Get user and token
      const user = response.data.data.user;
      const token = response.data.data.token;

      console.log('USER:', user);
      console.log('ROLE:', user.role);

      // Save token
      localStorage.setItem('token', token);

      // Save user
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('User Login successfully');

      // Role-based navigation
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'registrar') {
        navigate('/registrar/dashboard');
      } else if (user.role === 'dean') {
        navigate('/dean/dashboard');
      } else {
        console.log('Unknown role:', user.role);
        setMessage('Unknown user role');
      }

    } catch (err) {
      console.log('Login error:', err.response?.data);

      setMessage(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        'Login failed'
      );
    }
  };

  return (
    <div className="page">
      <h1>{message}</h1>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        {passwordError && (
          <p style={{ color: 'red' }}>
            {passwordError}
          </p>
        )}

        <button type="submit" className="button">
          Login
        </button>

        <p>
          Don't have an account?{' '}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;