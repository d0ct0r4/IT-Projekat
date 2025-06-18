import React, { use, useState } from 'react';
import AutaTable from './Client/AutaTable';
import PopravkaTable from './Client/PopravkaTable';
import RacunTable from './Client/RacunTable';
import ZahtjeviTable from './Client/ZahtjeviTable';

const ClientDashboard = ({ user }) => {
  const [selectedTable, setSelectedTable] = useState('auta');

  const renderTable = () => {
    switch (selectedTable) {
      case 'auta':
        return <AutaTable user={user} />;
      case 'popravke':
        return <PopravkaTable user={user} />;
      case 'racuni':
        return <RacunTable user={user} />
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
        <option value="auta">Vozila</option>
        <option value="popravke">Popravke</option>
        <option value="racuni">Racuni</option>
        <option value="zahtjevi">Zahtjevi</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {renderTable()}
      </div>
    </div>
  );
};

export default ClientDashboard;
