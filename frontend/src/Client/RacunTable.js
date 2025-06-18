import React, { useEffect, useState } from 'react';

const RacunTable = ({ user }) => {
  const [racuni, setRacuni] = useState([]);

  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/racun/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setRacuni(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju racuna:', err);
          setRacuni([]);
        });
    }
  }, [user]);

  return (
    <div>
      <h2>Moja Vozila</h2>
      {racuni.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(racuni[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {racuni.map((racun, idx) => (
              <tr key={idx}>
                {Object.values(racun).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nemate racune.</p>
      )}
    </div>
  );
};

export default RacunTable;