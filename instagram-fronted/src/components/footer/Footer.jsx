import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="ig-footer">
      <div className="ig-footer-links">
        <a href="#meta">Meta</a>
        <a href="#about">About</a>
        <a href="#blog">Blog</a>
        <a href="#jobs">Jobs</a>
        <a href="#help">Help</a>
        <a href="#api">API</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
        <a href="#locations">Locations</a>
        <a href="#popular">Instagram Lite</a>
        <a href="#meta-ai">Meta AI</a>
        <a href="#threads">Threads</a>
        <a href="#contact">Contact Uploading & Non-Users</a>
        <a href="#verified">Meta Verified</a>
      </div>
      <div className="ig-footer-bottom">
        <select className="ig-lang-select">
          <option value="en">English</option>
          <option value="ur">Urdu</option>
          <option value="es">Spanish</option>
        </select>
        <span>© 2026 Instagram from Meta</span>
      </div>
    </footer>
  );
}