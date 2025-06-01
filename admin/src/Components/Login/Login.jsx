import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    // Simple validation - both fields should be "sara"
    if (username.toLowerCase() === 'sara' && password.toLowerCase() === 'sara') {
      setError('');
      // Animation delay before navigation
      setTimeout(() => {
        setLoggedIn(true);
        navigate('/admin/voitures');
      }, 1000);
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      setIsAnimating(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-box ${isAnimating ? 'success-animation' : ''}`}>
        <div className="login-header">
          <h1>LuxDrive</h1>
          <p>Connectez-vous pour accéder au système</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={isAnimating ? 'input-success' : ''}
            />
            <label htmlFor="username" className={username ? 'active' : ''}>Nom d'utilisateur</label>
          </div>
          
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={isAnimating ? 'input-success' : ''}
            />
            <label htmlFor="password" className={password ? 'active' : ''}>Mot de passe</label>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className={`login-button ${isAnimating ? 'button-loading' : ''}`}
            disabled={isAnimating}
          >
            {isAnimating ? '' : 'CONNEXION'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;