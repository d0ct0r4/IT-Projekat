import React, { useEffect, useState } from 'react';
import DodajZahtjev from './DodajZahtjev';

const ZahtjeviTable = ({ user }) => {
  const [zahtjevi, setZahtjevi] = useState([]);
  const [vin, setVin] = useState('');
  const [vinovi, setVinovi] = useState([]);
  const [popupZahtjev, setPopupZahtjev] = useState(false);

  // Dohvati listu zahtjeva i VIN-ova
  const refreshZahtjevi = () => {
    if (!user?.linked_id) return;

    fetch(`http://localhost:8081/zahtjevi/client/${user.linked_id}`)
      .then(res => res.json())
      .then(data => setZahtjevi(data))
      .catch(err => {
        console.error('Greška pri dohvaćanju zahtjeva:', err);
        setZahtjevi([]);
      });

    fetch(`http://localhost:8081/auto/vin/${user.linked_id}`)
      .then(res => res.json())
      .then(data => setVinovi(data))
      .catch(err => console.error('Greška pri dohvaćanju VIN-ova:', err));
  };

  useEffect(() => {
    refreshZahtjevi();
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Da li ste sigurni da želite obrisati zahtjev?")) return;

    fetch(`http://localhost:8081/zahtjevi/delete/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setZahtjevi(prev => prev.filter(z => z.ID !== id));
          alert('Zahtjev obrisan!');
        } else throw new Error('Brisanje nije uspjelo');
      })
      .catch(err => {
        console.error('Greška pri brisanju zahtjeva:', err);
        alert('Greška pri brisanju zahtjeva');
      });
  };

  return (
    <div>
      <h2>Moji Zahtjevi</h2>

      {zahtjevi.length > 0 ? (
        <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Musterije</th>
              <th>JMBG Radnika</th>
              <th>VIN</th>
              <th>ID Popravke</th>
              <th>Datum Slanja</th>
              <th>Status</th>
              <th>Opis</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {zahtjevi.map((z, idx) => (
              <tr key={idx}>
                {Object.values(z).map((val, i) => (
                  <td key={i}>
                    {i === 6
                      ? val === 0
                        ? 'Nije preuzeto'
                        : val === 1
                        ? 'Preuzeto'
                        : 'Završeno'
                      : val}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleDelete(z.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>Nema zahtjeva.</p>
      )}

      {/* Forma za dodavanje zahtjeva */}
      <div style={{ marginTop: '20px' }}>
        <select value={vin} onChange={(e) => setVin(e.target.value)} required>
          <option value="">Odaberi VIN</option>
          {vinovi.map((item, idx) => (
            <option key={idx} value={item.VIN}>{item.VIN}</option>
          ))}
        </select>
        <button onClick={() => setPopupZahtjev(true)}>Dodaj zahtjev</button>
      </div>

      {/* Popup za dodavanje zahtjeva */}
      {popupZahtjev && (
        <DodajZahtjev
          vin={vin}
          musterijaId={user?.linked_id}
          onClose={() => setPopupZahtjev(false)}
          onSubmit={({ vin, musterijaId, naziv }) => {
            const poslan_datum = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            fetch('http://localhost:8081/zahtjevi/insert', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                musterija_ID: musterijaId,
                Vin: vin,
                naziv: naziv,
                poslan_datum: poslan_datum,
              }),
            })
            .then(res => res.json())
            .then(() => {
              alert('Zahtjev uspješno dodat!');
              setPopupZahtjev(false);
              setVin('');
              refreshZahtjevi();
            })
            .catch(err => {
              console.error('Greška:', err);
              alert('Greška pri dodavanju zahtjeva');
            });
          }}
        />
      )}
    </div>
  );
};

export default ZahtjeviTable;
