import React, { useState, useEffect } from 'react';

const TableViewer = () => {
  const [selectedTable, setSelectedTable] = useState('auto');
  const [data, setData] = useState([]);

  const tables = [
    'auto',
    'automehanicar',
    'elektricar',
    'firma',
    'musterija',
    'nabavka',
    'popravka',
    'racun',
    'radnici',
    'dijelovi'
  ];

  useEffect(() => {
    fetch(`http://localhost:8081/${selectedTable}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => {
        console.error('Greška pri dohvaćanju podataka:', err);
        setData([]);
      });
  }, [selectedTable]);

  return (
    <div>
      <h2>Pregled Tabela</h2>
      <select onChange={(e) => setSelectedTable(e.target.value)} value={selectedTable}>
        {tables.map((table) => (
          <option key={table} value={table}>{table}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
        
        {data.length > 0 ? (
          <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((col) => (
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
          <p>Nema podataka ili greška u konekciji.</p>
        )}
      </div>
    </div>
  );
};

export default TableViewer;
