import React, { use, useState } from 'react';
import KorisniciTable from './Admin/KorisniciTable';
import RadniciTable from './Admin/RadniciTable';

const AdminDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('musterija');

  const renderTable = () => {
    switch (selectedTable) {
      case 'korisnici':
        return <KorisniciTable></KorisniciTable>
      case 'radnici':
        return <RadniciTable></RadniciTable>
      default:
        return <KorisniciTable></KorisniciTable>;
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
