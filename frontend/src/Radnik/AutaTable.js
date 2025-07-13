import React, { useEffect, useState } from 'react';

const AutaTable = ({ user }) => {
  const [auta, setAuta] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/auto`)
      .then((res) => res.json())
      .then((data) => setAuta(data))
      .catch((err) => {
        console.error('Greška pri dohvaćanju auta:', err);
        setAuta([]);
      });
  }, [user]);

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
        <h2>Sva Vozila</h2>
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
            
        </table>
      ) : (
        <div>
            <p>Nema auta.</p>
        </div>
      )}
    </div>
  );
};
export default AutaTable;