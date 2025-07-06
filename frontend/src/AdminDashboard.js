import React, { use, useState } from 'react';
import AutomehanicarTable from './Admin/AutomehanicarTable';
import AutaTable from './Admin/AutaTable';
import MusterijaTable from './Admin/MusterijaTable';

const AdminDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('auta');

  console.log(user);

  const renderTable = () => {
    switch (selectedTable) {
      case 'auta':
        return <AutaTable/>;
      case 'musterija':
        return <MusterijaTable user={user}/>
      default:
        return <p>Izaberite tabelu.</p>;
    }
  };
  return (
    <div>
      <h2>Pregled podataka</h2>

      <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="auta">Vozila</option>
        <option value="musterija">Musterija</option>
        <option value="radnici">Radnici</option>
        <option value="automehanicar">Automehanicari</option>
        <option value="elektricar">Elektricari</option>
        <option value="dijelovi">Dijelovi</option>
        <option value="nabavka">Nabavke</option>
        <option value="popravke">Popravke</option>
        <option value="zahtjevi">Zahtjevi</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default AdminDashboard;
