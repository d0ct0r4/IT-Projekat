import React, { useEffect, useState } from 'react';

const PopravkaTable = ({ user }) => {
  const [popravke, setPopravke] = useState([]);

  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/popravka/`)
        .then((res) => res.json())
        .then((data) => setPopravke(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju popravki:', err);
          setPopravke([]);
        });
    }
  }, [user]);

  return (
    <div>
      <h2>Moja Vozila</h2>
      {popravke.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(popravke[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {popravke.map((popravka, idx) => (
              <tr key={idx}>
                {Object.values(popravka).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nemate popravke.</p>
      )}
    </div>
  );
};

export default PopravkaTable;