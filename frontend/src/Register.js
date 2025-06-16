import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
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
    <div>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="admin">Admin</option>
      </select><br />
      <button onClick={handleRegister}>Register</button>
      <p>{msg}</p>
    </div>
  );
}

export default Register;
