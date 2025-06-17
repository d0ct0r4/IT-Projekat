import React, { useEffect, useState } from 'react';

const ClientDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('auto');
  const [data, setData] = useState([]);

  const tables = [
    { name: 'Auto', route: 'auto' },
    { name: 'Popravka', route: 'popravka' },
    { name: 'Racun', route: 'racun' },
  ];

  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/${selectedTable}/client/${user.linked_id}`)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(err => {
          console.error('Greška pri dohvaćanju podataka:', err);
          setData([]);
        });
    }
  }, [selectedTable, user]);

  return (
    <div>
      <h2>Moji podaci</h2>
      <select onChange={(e) => setSelectedTable(e.target.value)} value={selectedTable}>
        {tables.map(table => (
          <option key={table.route} value={table.route}>{table.name}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nema podataka za odabranu tabelu.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
