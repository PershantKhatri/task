import React, { useState } from 'react';
import './Login.css';

function Login({ onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || data.error);
      }
    } catch (err) {
      setMessage('Cannot Connect To Server!');
    }
  };

  return (
    <div className="ig-login-box">
      <h2 className="ig-login-title">Log into Instagram</h2>

      {message && (
        <p style={{ color: message.includes('Successfully') ? 'green' : 'red', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>
          {message}
        </p>
      )}

      <form className="ig-login-form" onSubmit={handleSubmit}>
        <div className="ig-input-group">
          <input 
            type="text" 
            name="emailOrPhone"
            placeholder="Mobile number, username or email" 
            value={formData.emailOrPhone}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="ig-input-group">
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit" className="ig-login-submit-btn">Log in</button>
      </form>

      <div className="ig-forgot-container">
        <a href="#forgot" onClick={(e) => e.preventDefault()}>Forgot password?</a>
      </div>
      <div className="ig-divider">
        <span>OR</span>
      </div>
      <button className="ig-fb-btn" onClick={(e) => e.preventDefault()}>
        <span className="ig-fb-icon">f</span> Log in with Facebook
      </button>
      
      <button className="ig-create-account-btn" onClick={onSwitchToSignup}>
        Create new account
      </button>
      
      <div className="ig-meta-footer">
        <span>Meta</span>
      </div>
    </div>
  );
}

export default Login;