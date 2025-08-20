import React, {useEffect, useState} from "react";
import Preuzmi from "./Preuzmi";
import Zavrsi from "./Zavrsi";

const MusterijeTable = ({user}) => {
    const [musterije, setMusterije] = useState([]);
    const [zahtjevi, setZahtjevi] = useState([]);
    const [pokazi, setPokazi] = useState(null);
    const [preuzmiID, setPreuzmiID] = useState(null);
    const [zavrsiID, setZavrsiID] = useState(null);
    
    useEffect (() => {
        fetch(`http://localhost:8081/musterija`)
        .then((res) => res.json())
        .then((data) => setMusterije(data))
        .catch((err) => {
            console.error("Greska pri dohvacanju musterija: ", err);
            setMusterije([]);
        })
    }, [])

    const togglePokazi = (id) => {
        if(pokazi === id){
            setPokazi(null);
            setZahtjevi([]);
        }
        else{
            setPokazi(id);
            showZahtjevi(id);
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

    const handlePreuzmi = (id, vin, musterija_id, naziv) => {

        const today = new Date();
        const formatted = today.toISOString().split('T')[0];

        fetch('http://localhost:8081/zahtjevi/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            radnik_jmbg: user?.radnik_jmbg,
            Auto_VIN: vin,
            naziv: naziv,
            pocetak_datum: formatted,
            musterija_id: musterija_id
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            alert('Uspjesno preuzet');
            showZahtjevi(pokazi);
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
        formData.append('zahtjev_id', zahtjev_id)
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
        const data = await res.json();
        alert('Završeno uspešno');
        showZahtjevi(pokazi);
        setZavrsiID(null);
        } catch (err) {
        console.error(err);
        alert('Greška pri završavanju');
        }
    }

    return (
        <div>
            <h2>Sve musterije</h2>
            {musterije.length > 0 ? (
                <table cellPadding="5" style={{borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                           <th>ID</th>
                           <th>Ime</th>
                           <th>Prezime</th>
                           <th>Broj Telefona</th>
                        </tr>
                    </thead>
                    <tbody>
                        {musterije.map((m) => (
                            <React.Fragment key={m.ID}>
                            <tr>
                            {Object.values(m).map((val) => (
                                <td>{val}</td>
                            ))}
                            <td>
                              <button onClick={() => togglePokazi(m.ID)}>
                                {pokazi === m.ID ? 'Sakrij' : 'Prikaži'}
                              </button>
                            </td>
                            </tr>
                            
                            {pokazi === m.ID && (
                                <tr>
                                    <td  colSpan={Object.keys(m).length + 2}>
                                        {zahtjevi.length > 0 ? (
                                            <table cellPadding="5" style={{ marginTop: '10px', width: '100%' }}>
                                                <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Musterija ID</th>
                                                    <th>JMBG Radnika</th>
                                                    <th>VIN</th>
                                                    <th>Popravka ID</th>
                                                    <th>Datum slanja</th>
                                                    <th>Status</th>
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
                                                            <button onClick={() => setPreuzmiID(z.ID)}>Preuzmi</button>) : 
                                                            (z.preuzet === 1) ? (<button onClick={() => setZavrsiID(z.ID)}>Zavrsi</button>) :
                                                            null}
                                                        {preuzmiID === z.ID && (
                                                            <Preuzmi onClose={() => setPreuzmiID(null)} 
                                                            onSubmit={(data) => {
                                                                handlePreuzmi(z.ID, z.VIN, z.musterija_ID, data.text)
                                                            }}/>                                                        
                                                        )}

                                                        {zavrsiID === z.ID && (
                                                            <Zavrsi onClose={() => setZavrsiID(null)}
                                                            onSubmit={({sati, file, koristeniDijelovi}) => {
                                                                handleZavrsi(sati, file, m.ID, z.popravka_ID, 10, z.ID, koristeniDijelovi)
                                                            }}/>
                                                        )}
                                                        </td>
                                                        </tr>
                                                        
                                                    </React.Fragment>
                                                ))}
                                                
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p>Ovaj korisnik nema zahtjeva.</p>
                                        )}
                                    </td>
                                </tr>
                            )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nema musterija.</p>
            )}
        </div>  
    );
};

export default MusterijeTable;