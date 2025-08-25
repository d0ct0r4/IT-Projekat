import React, { useState } from 'react';

const RegistracijaPopUp = ({ onClose, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('radnik'); // default radnik
  const [linkedId, setLinkedId] = useState(''); // optional
  const [radnikJmbg, setRadnikJmbg] = useState(''); // optional

  const handleSubmit = () => {
    if (!username || !password || !role) {
      alert('Popunite obavezna polja (username, password, role)!');
      return;
    }

    onSubmit({
      username,
      password,
      role,
      linked_id: linkedId || null,
      radnik_jmbg: radnikJmbg || null
    });

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px',
          boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        }}
      >
        <h2>Registracija korisnika</h2>

        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <label>Role:</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="radnik">Radnik</option>
          <option value="admin">Admin</option>
        </select>

        <label>Linked ID (opcionalno):</label>
        <input type="text" value={linkedId} onChange={e => setLinkedId(e.target.value)} />

        <label>Radnik JMBG (opcionalno):</label>
        <input type="text" value={radnikJmbg} onChange={e => setRadnikJmbg(e.target.value)} />

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleSubmit} style={{ marginRight: '10px' }}>Registruj</button>
          <button onClick={onClose} style={{ background: 'red', color: 'white' }}>Zatvori</button>
        </div>
      </div>
    </div>
  );
};

export default RegistracijaPopUp;
