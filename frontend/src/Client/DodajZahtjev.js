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
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
      >
        <button
          className='modal-close'
          onClick={onClose}>
          X
        </button>

        <h1 className='modal-title'>Novi zahtjev</h1>
        
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
