
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import api from '../../api';
import '../../css/Register.css';
import { Link } from 'react-router-dom';

function User() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation errors
  const [userErr, setUserError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Server message
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Username validation
    if (!username || username.length < 3) {
      setUserError(
        'Username is required and must be at least 3 characters long'
      );
      isValid = false;
    } else {
      setUserError('');
    }

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

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // STOP if frontend validation fails
    if (!isValid) {
      console.log('Form submission failed');
      return;
    }

    console.log('Form validation successful');

    // Send data to backend
    try {
      const res = await api.post('/user', {
        username: username,
        email: email,
        password: password
      });

      // Successful response
      console.log(res.data);

      setMessage(res.data.message);

      alert('User created successfully');

    } catch (err) {
      console.log(err.response?.data);

      // Email already exists
      if (err.response?.status === 409) {
        setMessage(err.response.data.message);
      } else {
        setMessage(
          err.response?.data?.message || 'Something went wrong'
        );
      }
    }
  };

  return (
    <div className="page">

      <h1>{message}</h1>

      <form onSubmit={handleSubmit} className="form">

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        

        {userErr && (
          <p style={{ color: 'red' }}>
            {userErr}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        

        {emailError && (
          <p style={{ color: 'red' }}>
            {emailError}
          </p>
        )}

        {/* Password */}
        <div className="password-container">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        <br />

        {passwordError && (
          <p style={{ color: 'red' }}>
            {passwordError}
          </p>
        )}

        {/* Confirm Password */}
        <div className="password-container">

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

        <br />
        <br />

        {confirmPasswordError && (
          <p style={{ color: 'red' }}>
            {confirmPasswordError}
          </p>
        )}

        {/* Sign Up */}
        <button type="submit" className="button">
          Sign Up
        </button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </form>
    </div>
  );
}

export default User;

