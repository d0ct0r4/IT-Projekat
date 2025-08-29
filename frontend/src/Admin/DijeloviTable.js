import React, { useEffect, useState } from "react";
import DodajDioPopUp from "./DodajDioPopUp";
import EditDioPopUp from "./EditDioPopUp";

const DijeloviTable = () => {
  const [djelovi, setDjelovi] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editDio, setEditDio] = useState(null);

  const fetchDjelovi = () => {
    fetch("http://localhost:8081/dijelovi")
      .then(res => res.json())
      .then(data => setDjelovi(data))
      .catch(err => console.error("Greška:", err));
  };

  useEffect(() => {
    fetchDjelovi();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Da li sigurno želiš obrisati ovaj dio?")) return;
    await fetch(`http://localhost:8081/delete/dijelovi/${id}`, { method: "DELETE" });
    fetchDjelovi();
  };

  return (
    <div>
      <h2>Dijelovi</h2>
      <button onClick={() => setShowPopup(true)}>Dodaj dio</button>

      {djelovi.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Cijena (€)</th>
              <th>Stanje</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {djelovi.map((d) => (
              <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.Naziv}</td>
                <td>{d.Cijena}</td>
                <td>{d.Stanje}</td>
                <td>
                  <button onClick={() => setEditDio(d)}>Edit</button>
                  <button onClick={() => handleDelete(d.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nema unesenih dijelova.</p>
      )}

      {showPopup && (
        <DodajDioPopUp
          onClose={() => setShowPopup(false)}
          onAdded={() => {
            setShowPopup(false);
            fetchDjelovi();
          }}
        />
      )}

      {editDio && (
        <EditDioPopUp
          dio={editDio}
          onClose={() => setEditDio(null)}
          onUpdated={() => {
            setEditDio(null);
            fetchDjelovi();
          }}
        />
      )}
    </div>
  );
};

export default DijeloviTable;
