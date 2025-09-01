import React, { use, useState } from 'react';
import KorisniciTable from './Admin/KorisniciTable';
import RadniciTable from './Admin/RadniciTable';
import DostavaTable from './Admin/DostavaTable';
import DijeloviTable from './Admin/DijeloviTable';

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
      case 'djelovi':
        return <DijeloviTable></DijeloviTable>
      default:
        return <KorisniciTable></KorisniciTable>;
    }
  };
  return (
    <div className='theme-admin'>
      <h2>Pregled podataka</h2>

      <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="korisnici">Korisnici</option>
        <option value="radnici">Radnici</option>
        <option value="dostava">Dostave</option>
        <option value="djelovi">Dijelovi</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;
