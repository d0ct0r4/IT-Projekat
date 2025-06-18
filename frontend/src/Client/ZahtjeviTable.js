import React, { useEffect, useState } from 'react';

const ZahtjeviTable = ({ user }) => {
  const [zahtjevi, setZahtjevi] = useState([]);

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
    </div>
  );
};

export default ZahtjeviTable;