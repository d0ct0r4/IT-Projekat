import React, { use, useState } from 'react';
import KorisniciTable from './Admin/KorisniciTable';
import RadniciTable from './Admin/RadniciTable';
import DostavaTable from './Admin/DostavaTable';

const AdminDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('musterija');

  const renderTable = () => {
    switch (selectedTable) {
      case 'korisnici':
        return <KorisniciTable></KorisniciTable>
      case 'radnici':
        return <RadniciTable></RadniciTable>
      case 'dostava':
        return <DostavaTable></DostavaTable>
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
        <option value="dostava">Dostave</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;
