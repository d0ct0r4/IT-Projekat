import React, { useState } from 'react';

function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg('Login successful!');
        onLogin(data.user);
      } else {
        setMsg(data.message || 'Login failed');
      }
    } catch (err) {
      setMsg('Error: ' + err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className='card auth-card'>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      <p className="auth-msg">
          Nemate nalog?{' '}
          <button className="btn-secondary" onClick={onSwitch}>Registrujte se</button>
        </p>
      <p className='auth-msg'>{msg}</p>
      </div>
    </div>
  );
}

export default Login;
