import React, {useEffect, useState} from "react";

const MusterijeTable = ({user}) => {
    const [musterije, setMusterije] = useState([]);
    const [zahtjevi, setZahtjevi] = useState([]);
    const [pokazi, setPokazi] = useState(null);

    console.log(user);
    
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

    const handlePreuzmi = (id) => {

        fetch('http://localhost:8081/zahtjevi/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id,
            radnik_jmbg: user?.radnik_jmbg
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

    return (
        <div>
            <h2>Sve musterije</h2>
            {musterije.length > 0 ? (
                <table cellPadding="5" style={{borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            {Object.keys(musterije[0]).map((key) => (
                            <th key={key}>{key}</th>
                            ))}
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
                                                    {Object.keys(zahtjevi[0]).map((key) => (
                                                    <th key={key}>{key}</th>
                                                    ))}
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {zahtjevi.map((z, i) => (
                                                    <React.Fragment key={z.preuzet}>
                                                        <tr key={i}>
                                                        {Object.values(z).map((val, j) => (
                                                            <td key={j}>{val}</td>
                                                        ))}
                                                        <td>
                                                            {z.preuzet === 0 ? <button onClick={() => handlePreuzmi(z.ID)}>Preuzmi</button> : <></>}
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