import React, { useState } from 'react';

function Register({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [brojTelefona, setBrojTelefona] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, ime, prezime, brojTelefona }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg('Registration successful!');
      } else {
        setMsg(data.message || 'Registration failed');
      }
    } catch (err) {
      setMsg('Error: ' + err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <h2>Register</h2>
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
        <input
          type="text"
          placeholder="Ime"
          value={ime}
          onChange={(e) => setIme(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Prezime"
          value={prezime}
          onChange={(e) => setPrezime(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Broj telefona"
          value={brojTelefona}
          onChange={(e) => setBrojTelefona(e.target.value)}
        /><br />
        <button onClick={handleRegister}>Register</button>
        <p className="auth-msg">
          Imate nalog?{' '}
          <button className="btn-secondary" onClick={onSwitch}>Loginujte se</button>
        </p>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default Register;
