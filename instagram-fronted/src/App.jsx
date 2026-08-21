import React, { useState } from 'react';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import './App.css';

function App() {
  const [view, setView] = useState('landing'); 

  return (
    <div className="ig-container">
      <div className="ig-main-wrapper">
        
        {/* Left Column */}
        <div className="ig-left-col">
          <div className="ig-left-content">
            
            {(view === 'login' || view === 'signup') && (
              <div className="ig-login-logo-top">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                  alt="Instagram" 
                  className="ig-small-camera-icon"
                />
              </div>
            )}

            <h1 className="ig-heading">
              See everyday moments from<br />
              your <span className="ig-pink-text">close friends</span>.
            </h1>
            <div className="ig-graphic-container">
              <img 
                src="https://static.cdninstagram.com/rsrc.php/yJ/r/53X3pk-t2Gn.webp" 
                alt="Close friends moments" 
                className="ig-mockup-graphic" 
              />
            </div>
          </div>
        </div>

        
        <div className="ig-right-col">
          {view === 'landing' && (
            <div className="ig-card-box">
              <div className="ig-logo-badge">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                  alt="Instagram" 
                  className="ig-camera-icon"
                />
              </div>
              <h2 className="ig-card-text">
                Get the full experience with the tablet app
              </h2>
              
        
              <button className="ig-action-btn" onClick={() => setView('login')}>
                Open Instagram
              </button>
              
              <div className="ig-bottom-links">
                <a 
                  href="#login" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setView('login'); 
                  }}
                >
                  Log in
                </a>
                <span className="ig-or">or</span>
                <a 
                  href="#signup" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setView('signup'); 
                  }}
                >
                  Sign up
                </a>
              </div>
            </div>
          )}

          {view === 'login' && (
            <Login onSwitchToSignup={() => setView('signup')} />
          )}

          {view === 'signup' && (
            <Signup onBackToLogin={() => setView('login')} />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;