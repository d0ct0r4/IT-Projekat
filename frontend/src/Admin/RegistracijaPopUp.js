import React, { useState } from 'react';

const RegistracijaPopUp = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'radnik', // default
    jmbg: '',
    ime: '',
    prezime: '',
    datumRodjenja: '',
    brojTelefona: '',
    tipRadnika: 'automehanicar', // automehanicar ili elektricar
    godineIskustva: '',
    satnica: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.password || !formData.role) {
      alert('Popunite obavezna polja (username, password, role)!');
      return;
    }

    onSubmit(formData);
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
          borderRadius: '10px',
          minWidth: '400px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        }}
      >
        {/* X dugme gore desno */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          ✖
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Registracija korisnika
        </h2>

        {/* Polja */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="radnik">Radnik</option>
            <option value="admin">Admin</option>
          </select>

          {formData.role === 'radnik' && (
            <>
              <hr style={{ margin: '10px 0' }} />
              <h3>Podaci o radniku</h3>

              <label>JMBG:</label>
              <input type="text" name="jmbg" value={formData.jmbg} onChange={handleChange} />

              <label>Ime:</label>
              <input type="text" name="ime" value={formData.ime} onChange={handleChange} />

              <label>Prezime:</label>
              <input type="text" name="prezime" value={formData.prezime} onChange={handleChange} />

              <label>Datum rođenja:</label>
              <input type="date" name="datumRodjenja" value={formData.datumRodjenja} onChange={handleChange} />

              <label>Broj telefona:</label>
              <input type="text" name="brojTelefona" value={formData.brojTelefona} onChange={handleChange} />

              <label>Tip radnika:</label>
              <select name="tipRadnika" value={formData.tipRadnika} onChange={handleChange}>
                <option value="automehanicar">Automehaničar</option>
                <option value="elektricar">Električar</option>
              </select>

              <label>Godine iskustva:</label>
              <input type="number" name="godineIskustva" value={formData.godineIskustva} onChange={handleChange} />

              <label>Satnica:</label>
              <input type="number" name="satnica" value={formData.satnica} onChange={handleChange} />
            </>
          )}
        </div>

        {/* Dugmad dole */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSubmit}
            style={{
              background: 'green',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Registruj
          </button>
          <button
            onClick={onClose}
            style={{
              background: '#ccc',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistracijaPopUp;
