import React, { useState } from 'react';
import './Signup.css';

export default function Signup({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    fullName: '',
    username: '',
    birthday: { month: '', day: '', year: '' }
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBirthdayChange = (field, value) => {
    setFormData({
      ...formData,
      birthday: { ...formData.birthday, [field]: value }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.emailOrPhone,
          fullname: formData.fullName,
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          onBackToLogin();
        }, 1500);
      } else {
        setMessage(data.message || data.error);
      }
    } catch (err) {
      setMessage('Cannot Connect To Server!');
    }
  };

  return (
    <div className="ig-signup-box">
      <div className="ig-signup-header">
        <button type="button" className="ig-back-btn" onClick={onBackToLogin}>&#8249;</button>
        <div className="ig-meta-logo-container">
          <span className="ig-meta-icon">∞</span> Meta
        </div>
      </div>

      <h2 className="ig-signup-title">Get started on Instagram with a Meta Account</h2>
      <p className="ig-signup-subtitle">
        A Meta Account lets you access multiple Meta technologies, like Instagram, easily and securely.
      </p>

      {message && (
        <p style={{ color: message.includes('success') ? 'green' : 'red', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>
          {message}
        </p>
      )}

      <form className="ig-signup-form" onSubmit={handleSubmit}>
        <div className="ig-signup-group">
          <label>Mobile number or email</label>
          <input 
            type="text" 
            name="emailOrPhone" 
            value={formData.emailOrPhone}
            onChange={handleChange}
            required 
          />
        </div>
        <p className="ig-signup-note">
          You may receive notifications from us. <a href="#learn">Learn why we ask for your contact information</a>
        </p>

        <div className="ig-signup-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="ig-signup-group">
          <label>Birthday <span className="ig-info-icon">?</span></label>
          <div className="ig-birthday-selectors">
            <select name="month" onChange={(e) => handleBirthdayChange('month', e.target.value)}>
              <option value="">Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, index) => (
                <option key={index} value={m}>{m}</option>
              ))}
            </select>

            <select name="day" onChange={(e) => handleBirthdayChange('day', e.target.value)}>
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select name="year" onChange={(e) => handleBirthdayChange('year', e.target.value)}>
              <option value="">Year</option>
              {Array.from({ length: 77 }, (_, i) => 2026 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="ig-signup-group">
          <label>Name</label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="Full name" 
            value={formData.fullName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="ig-signup-group">
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>

        <p className="ig-terms-text">
          People who use our service may have uploaded your contact information to Instagram. <a href="#learn">Learn more</a>.<br /><br />
          By tapping Submit, you agree to create an account and to Instagram's <a href="#terms">Terms</a>, <a href="#privacy">Privacy Policy</a> and <a href="#cookies">Cookies Policy</a>.<br /><br />
          The <a href="#privacy-desc">Privacy Policy</a> describes the ways we can use the information we collect when you create an account.
        </p>

        <button type="submit" className="ig-signup-submit-btn">Submit</button>
        
        <button type="button" className="ig-already-acc-btn" onClick={onBackToLogin}>
          I already have an account
        </button>
      </form>
    </div>
  );
}