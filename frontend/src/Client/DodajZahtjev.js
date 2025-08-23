import React, { useState } from 'react';

const DodajZahtjev = ({ vin, musterijaId, onClose, onSubmit }) => {
  const [naziv, setNaziv] = useState('');

  const handleSubmit = () => {
    if (!naziv.trim()) {
      alert("Unesite naziv zahtjeva!");
      return;
    }
    if (onSubmit) onSubmit({ vin, musterijaId, naziv });
    if (onClose) onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.10)',
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
          zIndex: 1001,
          boxShadow: '0 0 10px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h1>Novi zahtjev</h1>
          <button onClick={onClose}
            style={{ background: 'red', color: 'white', borderRadius: '5px' , height: '24px'}}>
            X
          </button>
        </div>

        <label>Naziv zahtjeva:</label>
        <input
          type="text"
          placeholder="Unesite naziv (opis problema)"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "15px" }}
        />

        <button onClick={handleSubmit}
          style={{ background: 'green', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
          Pošalji zahtjev
        </button>
      </div>
    </div>
  );
};

export default DodajZahtjev;
