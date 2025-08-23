import React, { useEffect, useState } from 'react';
import DodajAuto from './DodajAuto';
import DodajZahtjev from './DodajZahtjev';


const AutaTable = ({ user }) => {
  const [auta, setAuta] = useState([]);
  const [dodaj, setDodaj] = useState(null);
  const [zahtjevi, setZahtjevi] = useState([]);
  const [popravke, setPopravke] = useState([]);
  const [pokazi, setPokazi] = useState('');
  const [popupSlika, setPopupSlika] = useState(null);
  const [dodajZahtjev, setDodajZahtjev] = useState(null);


  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/auto/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setAuta(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju auta:', err);
          setAuta([]);
        });
    }
  }, [user]);

  const handleDodaj = (vin, registracija, marka, model, godiste) => {

    fetch('http://localhost:8081/auto/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Vin: vin,
        Marka: marka,
        Model: model,
        Godiste: godiste,
        Registracija: registracija,
        Vlasnik_ID: user?.linked_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Auto uspješno dodat!');
        fetch(`http://localhost:8081/auto/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setAuta(data))
        .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error('Greška:', err);
        alert('Greška pri dodavanju vozila');
      });
  };

  const handleDelete = (vin) => {
    if (!window.confirm('Da li ste sigurni da želite obrisati vozilo?')) return;
  
    fetch(`http://localhost:8081/auto/delete/${vin}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setAuta((prev) => prev.filter((auto) => auto.VIN !== vin));
          alert('Vozilo obrisano!');
        } else {
          throw new Error('Brisanje nije uspjelo');
        }
      })
      .catch((err) => {
        console.error('Greška pri brisanju vozila:', err);
        alert('Greška pri brisanju vozila');
      });
  };

  const togglePokazi = (vin) => {
    if(pokazi === vin){
        setPokazi(null);
        setZahtjevi([]);
        setPopravke([]);
    }
    else{
        setPokazi(vin);
        showTabele(vin);
    }
}
  
  const showTabele = (vin) => {
      fetch(`http://localhost:8081/popravka/auto/${vin}`)
      .then((res) => res.json())
      .then((data) => setPopravke(data))
      .catch((err) => console.error(err));

      fetch(`http://localhost:8081/zahtjevi/auto/${vin}`)
      .then((res) => res.json())
      .then((data) => setZahtjevi(data))
      .catch((err) => console.error(err));
  }

  const handleDodajZahtjev = ({ vin, musterijaId, naziv }) => {
    fetch('http://localhost:8081/zahtjevi/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        musterija_ID: user?.linked_id,
        Vin: vin,
        naziv: naziv,
        poslan_datum: new Date().toISOString().split('T')[0]
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Zahtjev uspješno poslan!');
        showTabele(vin); // osvježi tabelu zahtjeva
      })
      .catch((err) => {
        console.error('Greška pri slanju zahtjeva:', err);
        alert('Greška pri slanju zahtjeva');
      });
  };
  

  return (
    <div>
        <h2>Moja Vozila</h2>
        {auta.length > 0 ? (
        <table>
            <thead>
            <tr>
                {Object.keys(auta[0]).map((key) => (
                <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {auta.map((auto) => (
              <React.Fragment key={auto.VIN}>
                <tr>
                {Object.values(auto).map((val, i) => (
                    <td key={i}>{val}</td>
                ))}
                <td>
                  <button onClick={() => handleDelete(auto.VIN)}>Delete</button>
                  <button onClick={() => togglePokazi(auto.VIN)}>
                      {pokazi === auto.VIN ? '↑' : '↓'}
                    </button>
                    <button onClick={() => setDodajZahtjev(auto.VIN)}>Dodaj Zahtjev</button>

                </td>
                </tr>

                {pokazi === auto.VIN && (
                    <tr>
                      <td colSpan={Object.keys(auto).length + 2}>
                          {zahtjevi.length > 0 ? (
                            <table cellPadding="5" style={{ marginTop: '10px', width: '100%' }}>
                            <thead>
                            <h4>Zahtjevi</h4>
                            <tr>
                                <th>ID</th>
                                <th>Musterija ID</th>
                                <th>JMBG Radnika</th>
                                <th>VIN</th>
                                <th>Popravka ID</th>
                                <th>Datum slanja</th>
                                <th>Status</th>
                                <th>Opis</th>
                            </tr>
                            </thead>
                            <tbody>
                            {zahtjevi.map((z, i) => (
                                <React.Fragment key={z.preuzet}>
                                    <tr key={i}>
                                    {Object.values(z).map((val, j) => (
                                        <td key={j}>
                                        {j === 6
                                          ? val === 0
                                            ? 'Nije preuzeto'
                                            : val === 1
                                              ? 'Preuzeto'
                                              : 'Zavrseno'
                                          : val}
                                      </td>
                                      
                                    ))}
                                    <td>
                                    </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                            
                            </tbody>
                          </table>
                          ) : (<p></p>)}

                          {popravke.length > 0 ? (
                            <table cellPadding="5" style={{ marginTop: '20px', width: '100%' }}>
                              <thead>
                              <h4>Popravke</h4>
                                <tr>
                                  <th>ID</th>
                                  <th>Radnik</th>
                                  <th>VIN</th>
                                  <th>Naziv</th>
                                  <th>Datum Pocetka</th>
                                  <th>Datum zavrsetka</th>
                                  <th>Slika</th>
                                </tr>
                              </thead>
                              <tbody>
                                {popravke.map((p, i) => (
                                  <tr key={i}>
                                    <td>{p.ID}</td>
                                    <td>{p.JMBG_Radnik}</td>
                                    <td>{p.Auto_VIN}</td>
                                    <td>{p.Naziv}</td>
                                    <td>{p.Pocetak_Datum}</td>
                                    <td>{p.Kraj_Datum }</td>
                                      {p.slika != null ?(
                                      <span
                                      style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                      onClick={() => setPopupSlika(`http://localhost:8081/${p.slika}`)}
                                    >
                                      Vidi sliku
                                    </span>) : <p>Nema slike</p>
                                      }
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p></p>
                          )}

                          {popupSlika && (
                            <div
                                onClick={() => setPopupSlika(null)}
                                style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000,
                                }}
                            >
                                <div
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: '#fff',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    minWidth: '300px',
                                    zIndex: 1001,
                                    boxShadow: '0 0 10px rgba(0,0,0,1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                                >
                                <h3>Slika auta</h3>
                                <img
                                    src={popupSlika}
                                    alt="popup"
                                    style={{
                                    maxWidth: '100%',
                                    maxHeight: '60vh',
                                    borderRadius: '6px',
                                    }}
                                />
                                <button
                                    onClick={() => setPopupSlika(null)}
                                    style={{
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    }}
                                >
                                    Zatvori
                                </button>
                                </div>
                            </div>
                        )}
                      </td>
                    </tr>
                )
                }
              </React.Fragment>
              ))}
            </tbody>
        </table>
      ) : (
        <div>
            <p>Nemate auta.</p>
        </div>
      )}

      <button onClick={() => setDodaj(1)}>Dodaj Auto</button>
      {dodaj === 1 && (
        <DodajAuto onClose={() => setDodaj(null)} 
        onSubmit={(auto) => {handleDodaj(auto.vin, auto.registracija, auto.marka, auto.model, auto.godiste)
        }}/>
      )}

      {dodajZahtjev && (
        <DodajZahtjev
          vin={dodajZahtjev}
          musterijaId={user?.linked_id}
          onClose={() => setDodajZahtjev(null)}
          onSubmit={handleDodajZahtjev}
        />
      )}
    </div>
  );
};
export default AutaTable;