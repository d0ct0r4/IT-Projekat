import React, { useEffect, useState } from 'react';

const ZahtjeviTable = ({ user }) => {
  const [zahtjevi, setZahtjevi] = useState([]);
  const [vin, setVin] = useState('');
  const [vinovi, setVinovi] = useState([]);

  useEffect(() => {

    if (user?.linked_id) {
      fetch(`http://localhost:8081/zahtjevi/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setZahtjevi(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju zahtjeva:', err);
          setZahtjevi([]);
        });

      fetch(`http://localhost:8081/auto/vin/${user.linked_id}`)
      .then((res) => res.json())
      .then((data) => setVinovi(data))
      .catch((err) => console.error('Greška pri dohvaćanju VIN-ova:', err));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();

    fetch('http://localhost:8081/zahtjevi/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        musterija_ID : user?.linked_id,
        Vin: vin,
        poslaniDatum: today.toISOString()
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Auto uspješno dodat!');
        setVin('');
      })
      .catch((err) => {
        console.error('Greška:', err);
        alert('Greška pri dodavanju vozila');
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Da li ste sigurni da zelite da obrisete zahtjev?")) return;

    fetch(`http://localhost:8081/zahtjevi/delete/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setZahtjevi((prev) => prev.filter((zahtjev) => zahtjev.ID !== id));
          alert('Zahtjev obrisan!');
        } else {
          throw new Error('Brisanje nije uspjelo');
        }
      })
      .catch((err) => {
        console.error('Greška pri brisanju zahtjeva:', err);
        alert('Greška pri brisanju zahtjeva');
      });
  };

  return (
    <div>
      <h2>Moja Zahtjevi</h2>
      {zahtjevi.length > 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {zahtjevi.map((zahtjev, idx) => (
              <tr key={idx}>
                {Object.values(zahtjev).map((val, i) => (
                  <td key={i}>{i === 6
                    ? val === 0
                      ? 'Nije preuzeto'
                      : val === 1
                        ? 'Preuzeto'
                        : 'Zavrseno'
                    : val}</td>
                ))}
                <td><button onClick={() => handleDelete(zahtjev.ID)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nemate zahtjeve.</p>
      )}
      <form onSubmit={handleSubmit}>
        <select value={vin} onChange={(e) => setVin(e.target.value)} required>
          <option value="">Odaberi VIN</option>
            {vinovi.map((item, idx) => (
              <option key={idx} value={item.VIN}>
                {item.VIN}
              </option>
            ))}
        </select>
        <button type='submit'>Posalji zahtjev</button>
      </form>
    </div>
  );
};

export default ZahtjeviTable;