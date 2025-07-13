import React, { use, useState } from 'react';
import AutaTable from './Radnik/AutaTable';
import MusterijaTable from './Radnik/MusterijaTable';
import PopravkaTable from './Radnik/PopravkaTable';

const RadnikDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('musterija');

  console.log(user);

  const renderTable = () => {
    switch (selectedTable) {
      case 'auta':
        return <AutaTable/>;
      case 'musterija':
        return <MusterijaTable user={user}/>
      case 'popravke':
        return <PopravkaTable user={user}/>
      default:
        return <p>Izaberite tabelu.</p>;
    }
  };
  return (
    <div>
      <h2>Pregled podataka</h2>

      <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
        <option value="musterija">Musterija</option>
        <option value="popravke">Popravke</option>
        <option value="zahtjevi">Zahtjevi</option>
        <option value="auta">Vozila</option>
        <option value="radnici">Radnici</option>
        <option value="automehanicar">Automehanicari</option>
        <option value="elektricar">Elektricari</option>
        <option value="dijelovi">Dijelovi</option>
        <option value="nabavka">Nabavke</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default RadnikDashboard;
