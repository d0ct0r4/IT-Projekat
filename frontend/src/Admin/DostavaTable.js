import React, { useEffect, useState } from "react";
import DodajDostavuPopUp from "./DodajDostavuPopUp";
import DodajDioPopUp from "./DodajDioPopUp";

const DostavaTable = () => {
  const [dostave, setDostave] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [stavke, setStavke] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showDioPopup, setShowDioPopup] = useState(false); // NOVO

  const fetchDostave = () => {
    fetch("http://localhost:8081/dostava")
      .then(res => res.json())
      .then(data => setDostave(data))
      .catch(err => console.error("Greška:", err));
  };

  useEffect(() => {
    fetchDostave();
  }, []);

  const toggleStavke = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);

    if (!stavke[id]) {
      fetch(`http://localhost:8081/dostava/${id}/stavke`)
        .then(res => res.json())
        .then(data => {
          setStavke(prev => ({ ...prev, [id]: data }));
        })
        .catch(err => console.error("Greška:", err));
    }
  };

  return (
    <div>
      <h2>Dostave</h2>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => setShowPopup(true)}>
          Dodaj dostavu
        </button>
        <button onClick={() => setShowDioPopup(true)}>
          Dodaj dio
        </button>
      </div>

      {dostave.length > 0 ? (
        <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firma</th>
              <th>Cijena</th>
              <th>Datum</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {dostave.map(d => (
              <React.Fragment key={d.ID}>
                <tr>
                  <td>{d.ID}</td>
                  <td>{d.firma}</td>
                  <td>{d.Cena}€</td>
                  <td>{d.Datum}</td>
                  <td>
                    <button onClick={() => toggleStavke(d.ID)}>
                      {expandedId === d.ID ? "↑" : "↓"}
                    </button>
                  </td>
                </tr>
                {expandedId === d.ID && (
                  <tr>
                    <td colSpan="5">
                      {stavke[d.ID] ? (
                        <ul>
                          {stavke[d.ID].map((s, i) => (
                            <li key={i}>
                              {s.Naziv} – {s.Kolicina} kom – {s.Cena} €
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Učitavanje...</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>Nema dostava.</p>
      )}

      {showPopup && (
        <DodajDostavuPopUp
          onClose={() => setShowPopup(false)}
          onSuccess={() => {
            setShowPopup(false);
            fetchDostave();
          }}
        />
      )}

      {showDioPopup && (
        <DodajDioPopUp
          onClose={() => setShowDioPopup(false)}
          onAdded={() => {
            setShowDioPopup(false);
          }}
        />
      )}

    </div>
  );
};

export default DostavaTable;
