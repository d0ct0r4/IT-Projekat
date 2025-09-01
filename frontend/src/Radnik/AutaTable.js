import React, { useEffect, useState } from "react";
import Zavrsi from "./Zavrsi";

const AutaTable = ({user}) => {
  const [auta, setAuta] = useState([]);
  const [search, setSearch] = useState("");
  const [marke, setMarke] = useState([]);
  const [modeli, setModeli] = useState([]);
  const [filterMarka, setFilterMarka] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [pokazi, setPokazi] = useState('');
  const [zahtjevi, setZahtjevi] = useState([]);
  const [popravke, setPopravke] = useState([]);
  const [popupSlika, setPopupSlika] = useState(null);
  const [zavrsiID, setZavrsiID] = useState(null);


  // Dohvati sva auta
  const fetchAuta = () => {
    fetch("http://localhost:8081/auto")
      .then((res) => res.json())
      .then((data) => setAuta(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAuta();

    // Dohvati marke
    fetch("http://localhost:8081/auto/marke")
      .then((res) => res.json())
      .then((data) => {console.log(data);setMarke(data)})
      .catch((err) => console.error(err));
  }, []);

  // Dohvati modele kada se odabere marka
  useEffect(() => {
    if (filterMarka) {
      fetch(`http://localhost:8081/auto/modeli/${filterMarka}`)
        .then((res) => res.json())
        .then((data) => setModeli(data))
        .catch((err) => console.error(err));
    } else {
      setModeli([]);
      setFilterModel("");
    }
  }, [filterMarka]);

  const handleDelete = (vin) => {
    if (!window.confirm("Da li ste sigurni da želite obrisati vozilo?")) return;
    fetch(`http://localhost:8081/auto/delete/${vin}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setAuta((prev) => prev.filter((a) => a.VIN !== vin));
          alert("Auto obrisan!");
        }
      })
      .catch((err) => console.error(err));
  };

  // Search/filter
  const handleFilter = () => {
    const params = new URLSearchParams({
      q: search,
      marka: filterMarka,
      model: filterModel,
    });
    fetch(`http://localhost:8081/auto/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setAuta(data))
      .catch((err) => console.error(err));
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

  const handlePreuzmi = (id, vin, musterija_id) => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];

    fetch('http://localhost:8081/zahtjevi/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        radnik_jmbg: user?.radnik_jmbg,
        Auto_VIN: vin,
        pocetak_datum: formatted,
        musterija_id: musterija_id
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Uspjesno preuzet');
        showTabele(pokazi);
      })
      .catch((err) => {
        console.error('Greška:', err);
        alert('Greška pri preuzimanju zahtjeva');
      });
  };

const handleZavrsi = async (sati, file, musterija_id, popravka_id, cena, zahtjev_id, koristeniDijelovi) => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];

    const formData = new FormData();
    formData.append('musterija_id', musterija_id);
    formData.append('popravka_id', popravka_id);
    formData.append('datum', formatted);
    formData.append('sati', sati);
    formData.append('cena', cena);
    formData.append('zahtjev_id', zahtjev_id);
    formData.append('radnik_jmbg', user?.radnik_jmbg);
    koristeniDijelovi.forEach((d, i) => {
        formData.append(`dijelovi[${i}][dioID]`, d.dioID);
        formData.append(`dijelovi[${i}][kolicina]`, d.kolicina);
    });
    if (file) formData.append('slika', file);

    try {
    const res = await fetch('http://localhost:8081/racun/stampaj', {
        method: 'POST',
        body: formData,
    });
    await res.json();
    alert('Završeno uspešno');
    showTabele(pokazi);
    setZavrsiID(null);
    } catch (err) {
    console.error(err);
    alert('Greška pri završavanju');
    }
}

const showZahtjevi = (id) => {
  fetch(`http://localhost:8081/zahtjevi/client/${id}`)
  .then((res) => res.json())
  .then((data) => setZahtjevi(data))
  .catch((err) => {
      console.error("Greska pri dohvacanju zahtjeva musterije: ", err);
      setZahtjevi([]);
  })
}

  return (
    <div>
      <h2>Sva Vozila</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Pretraži po VIN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterMarka} onChange={(e) => setFilterMarka(e.target.value)}>
          <option value="">Sve marke</option>
          {marke.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        {modeli.length > 0 && (
          <select value={filterModel} onChange={(e) => setFilterModel(e.target.value)}>
            <option value="">Svi modeli</option>
            {modeli.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
        <button onClick={handleFilter}>Filter</button>
      </div>

      {auta.length > 0 ? (
        <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>VIN</th>
              <th>ID Vlasnika</th>
              <th>Registracija</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Godiste</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {auta.map((auto) => (
              <React.Fragment key={auto.VIN}>
              <tr key={auto.VIN}>
                <td>{auto.VIN}</td>
                <td>{auto.Vlasnik_ID}</td>
                <td>{auto.Registracija}</td>
                <td>{auto.Marka}</td>
                <td>{auto.Model}</td>
                <td>{auto.Godiste}</td>
                <td>
                  <button onClick={() => handleDelete(auto.VIN)}>Delete</button>
                  <button onClick={() => togglePokazi(auto.VIN)}>
                      {pokazi === auto.VIN ? '↑' : '↓'}
                  </button>
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
                            {z.preuzet === 0 ? (
                                <button onClick={() => handlePreuzmi(z.ID, z.VIN, z.musterija_ID)}>
                                    Preuzmi
                                </button>
                            ) : 
                            (z.preuzet === 1) ? (
                                <button onClick={() => setZavrsiID(z.ID)}>Zavrsi</button>
                            ) : null}
                            {zavrsiID === z.ID && (
                                <Zavrsi onClose={() => setZavrsiID(null)}
                                    onSubmit={({sati, file, koristeniDijelovi}) => {
                                        handleZavrsi(sati, file, z.musterija_ID, z.popravka_ID, 10, z.ID, koristeniDijelovi)
                                    }}
                                />
                            )}
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
                            onClick={() => setPopupSlika(`http://localhost:8081${p.slika}`)}
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
        </div>
      ) : (
        <p>Nema auta.</p>
      )}
    </div>
  );
};

export default AutaTable;
