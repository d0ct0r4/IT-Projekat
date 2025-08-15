import React, { useEffect, useState } from 'react';
import DodajAuto from './DodajAuto';

const AutaTable = ({ user }) => {
  const [auta, setAuta] = useState([]);
  const [dodaj, setDodaj] = useState(null);

  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/auto/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setAuta(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju auta:', err);
          setAuta([]);
        });
    }
  }, [user]);

  const handleDodaj = (vin, registracija, marka, model, godiste) => {

    fetch('http://localhost:8081/auto/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Vin: vin,
        Marka: marka,
        Model: model,
        Godiste: godiste,
        Registracija: registracija,
        Vlasnik_ID: user?.linked_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Auto uspješno dodat!');
        fetch(`http://localhost:8081/auto/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setAuta(data))
        .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error('Greška:', err);
        alert('Greška pri dodavanju vozila');
      });
  };

  const handleDelete = (vin) => {
    if (!window.confirm('Da li ste sigurni da želite obrisati vozilo?')) return;
  
    fetch(`http://localhost:8081/auto/delete/${vin}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setAuta((prev) => prev.filter((auto) => auto.VIN !== vin));
          alert('Vozilo obrisano!');
        } else {
          throw new Error('Brisanje nije uspjelo');
        }
      })
      .catch((err) => {
        console.error('Greška pri brisanju vozila:', err);
        alert('Greška pri brisanju vozila');
      });
  };
  

  return (
    <div>
        <h2>Moja Vozila</h2>
        {auta.length > 0 ? (
        <table>
            <thead>
            <tr>
                {Object.keys(auta[0]).map((key) => (
                <th key={key}>{key}</th>
                ))}
                <th>
                Action
                </th>
            </tr>
            </thead>
            <tbody>
            {auta.map((auto, idx) => (
                <tr key={idx}>
                {Object.values(auto).map((val, i) => (
                    <td key={i}>{val}</td>
                ))}
                <td>
                  <button onClick={() => handleDelete(auto.VIN)}>Delete</button>
                </td>
                </tr>
            ))}
              
            </tbody>
            <button onClick={() => setDodaj(1)}>Dodaj Auto</button>
            {dodaj === 1 && (
              <DodajAuto onClose={() => setDodaj(null)} 
              onSubmit={(auto) => {handleDodaj(auto.vin, auto.registracija, auto.marka, auto.model, auto.godiste)
              }}/>
            )}
        </table>
      ) : (
        <div>
            <p>Nemate auta.</p>
        </div>
      )}
        
    </div>
  );
};
export default AutaTable;