import React, { use, useState } from 'react';
import AutaTable from './Radnik/AutaTable';
import MusterijaTable from './Radnik/MusterijaTable';
import PopravkaTable from './Radnik/PopravkaTable';
import ZahtjeviTable from './Radnik/ZahtjeviTable';


const RadnikDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('musterija');
  
  const renderTable = () => {
    switch (selectedTable) {
      case 'auta':
        return <AutaTable/>;
      case 'musterija':
        return <MusterijaTable user={user}/>
      case 'popravke':
        return <PopravkaTable user={user}/>
      case 'zahtjevi':
        return <ZahtjeviTable user={user}/>
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
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default RadnikDashboard;
