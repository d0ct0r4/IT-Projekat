import React, { use, useState } from 'react';

const AdminDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('musterija');

  console.log(user);

  const renderTable = () => {
    switch (selectedTable) {
      case 'korisnici':
        return <p>Test</p>
      default:
        return <p>Izaberite tabelu.</p>;
    }
  };
  return (
    <div>
      <h2>Pregled podataka</h2>

      <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="korisnici">Korisnici</option>
        <option value="radnici">Radnici</option>
        <option value="automehanicar">Automehanicari</option>
        <option value="elektricar">Elektricari</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;
