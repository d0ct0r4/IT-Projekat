import React, { useState, useEffect } from "react";

const Zavrsi = ({ onClose, onSubmit }) => {
    const [file, setFile] = useState(null)
    const [sati, setSati] = useState('');
    
    const [dijelovi, setDijelovi] = useState([]);
    const [kolicine, setKolicine] = useState([]); // niz: [0,0,0...]
    
    useEffect(() => {
      fetch("http://localhost:8081/dijelovi")
        .then(res => res.json())
        .then(data => {
          setDijelovi(data);
          setKolicine(new Array(data.length).fill(0)); // inicijalno 0 za svaki red
        })
        .catch(err => console.error(err));
    }, []);
  
    const handleChange = (index, value) => {
      setKolicine(prev => {
        const copy = [...prev];
        copy[index] = Number(value);
        return copy;
      });
    };

    const handleSubmit = () => {
      const koristeniDijelovi = dijelovi
      .map((d, i) => ({
        dioID: d.ID,
        kolicina: kolicine[i]
      }))
      .filter(d => d.kolicina > 0);

      console.log("Sati: ", sati)

      onSubmit({ sati, file, koristeniDijelovi });
      if (onClose) onClose();
    };

    return (
      <div
        className="modal-overlay"
        onClick={onClose}
      >
        <div
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
        >
                
                <button
                  className="modal-close"
                 onClick={onClose}
                >X</button>
          
          <h1 className="modal-title">Zavrsi</h1>
          <input type='file' id='slika' accept="image/*" onChange={e => setFile(e.target.files[0])}></input> <br /> <br />
          <input type='text' id="sati" placeholder='Sati' onChange={e => setSati(e.target.value)}></input> <br /> <br />
          <h4 className="modal-title">Korišćeni dijelovi</h4>
        <table>
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Dostupno</th>
              <th>Količina</th>
            </tr>
          </thead>
          <tbody>
            {dijelovi.map((d, idx) => (
              <tr key={`${d.DioID}-${idx}`}>
                <td>{d.Naziv}</td>
                <td>{d.Kolicina}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={d.Kolicina}
                    value={kolicine[idx] || 0}
                    onChange={e => handleChange(idx, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <button onClick=  {handleSubmit}>Pošalji</button>
        </div>
      </div>
    );
  };
  
  export default Zavrsi;
  