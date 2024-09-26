// File path: time-tracker-app/frontend/src/components/Login.jsx
import React, { useState } from 'react';
import '../styles/login.css'; // Make sure your styles are set up to handle this structure

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only needed for signup
  const [isSignupMode, setIsSignupMode] = useState(false); // Track which form is active
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('');

  // Function to toggle between Login and Signup mode
  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  // Handle form submission for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignupMode ? 'http://localhost:5000/signup' : 'http://localhost:5000/login'; // Adjust URLs as necessary

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isSignupMode ? { username, email, password } : { email, password }
        ),
      });

      if (response.ok) {
        setPopupText(isSignupMode ? 'Signup successful! You can now log in.' : 'Login successful!');
        if (!isSignupMode) {
          onLogin(); // Call onLogin if it's a login action
        }
      } else {
        setPopupText(isSignupMode ? 'Signup failed. Please try again.' : 'Login failed. Please try again.');
      }
    } catch (error) {
      setPopupText('Error occurred while processing your request.');
    }
    setShowPopup(true);
  };

  return (
    <div className="auth-container">
      {/* Toggle Buttons to switch between Login and Signup */}
      <div className="toggle-buttons">
        <button
          className={!isSignupMode ? 'active' : ''}
          onClick={() => setIsSignupMode(false)}
        >
          Login
        </button>
        <button
          className={isSignupMode ? 'active' : ''}
          onClick={() => setIsSignupMode(true)}
        >
          Sign Up
        </button>
      </div>

      {/* Form Container */}
      <div className="form-container">
        {/* Login and Signup forms will toggle visibility based on isSignupMode state */}
        <form onSubmit={handleSubmit} className={isSignupMode ? 'signup-form active' : 'login-form active'}>
          <h2>{isSignupMode ? 'Sign Up' : 'Login'}</h2>
          
          {/* Username field for signup only */}
          {isSignupMode && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignupMode ? 'Sign Up' : 'Login'}</button>
        </form>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div id="popupMessage" className="popup">
          <span>{popupText}</span>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Login;
