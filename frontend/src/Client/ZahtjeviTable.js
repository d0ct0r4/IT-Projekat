import React, { useEffect, useState } from 'react';

const ZahtjeviTable = ({ user }) => {
  const [zahtjevi, setZahtjevi] = useState([]);
  const [vin, setVin] = useState('');

  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/zahtjevi/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setZahtjevi(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju zahtjeva:', err);
          setZahtjevi([]);
        });
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

  return (
    <div>
      <h2>Moja Vozila</h2>
      {zahtjevi.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(zahtjevi[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zahtjevi.map((zahtjev, idx) => (
              <tr key={idx}>
                {Object.values(zahtjev).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nemate zahtjeve.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input placeholder='VIN' value={vin} onChange={(e) => setVin(e.target.value)} required/>
        <button type='submit'>Posalji zahtjev</button>
      </form>
    </div>
  );
};

export default ZahtjeviTable;