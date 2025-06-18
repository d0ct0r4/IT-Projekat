import React, { useEffect, useState } from 'react';

const AutaTable = ({ user }) => {
  const [auta, setAuta] = useState([]);
  const [vin, setVin] = useState('');
  const [marka, setMarka] = useState('');
  const [model, setModel] = useState('');
  const [godiste, setGodiste] = useState('');
  const [registracija, setRegistracija] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

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
        setVin('');
        setMarka('');
        setModel('');
        setGodiste('');
        setRegistracija('');
      })
      .catch((err) => {
        console.error('Greška:', err);
        alert('Greška pri dodavanju vozila');
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
                    <button>Delete</button>
                </td>
                </tr>
            ))}
                
            </tbody>
            
        </table>
      ) : (
        <div>
            <p>Nemate auta.</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input placeholder="VIN" value={vin} onChange={(e) => setVin(e.target.value)} required /><br />
        <input placeholder="Marka" value={marka} onChange={(e) => setMarka(e.target.value)} required /><br />
        <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required /><br />
        <input placeholder="Godište" type="number" value={godiste} onChange={(e) => setGodiste(e.target.value)} required /><br />
        <input placeholder="Registracija" value={registracija} onChange={(e) => setRegistracija(e.target.value)} required /><br />
      <button type='submit'>Dodaj auto</button>
      </form>
    </div>
  );
};
export default AutaTable;