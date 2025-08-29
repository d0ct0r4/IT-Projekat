import React, { useEffect, useState } from "react";
import DodajDioPopUp from "./DodajDioPopUp";
import EditDioPopUp from "./EditDioPopUp";

const DijeloviTable = () => {
  const [dijelovi, setDijelovi] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedDio, setSelectedDio] = useState(null);
  const [search, setSearch] = useState("");

  const fetchDijelovi = () => {
    fetch("http://localhost:8081/dijelovi")
      .then(res => res.json())
      .then(data => setDijelovi(data))
      .catch(err => console.error("Greška:", err));
  };

  const searchDijelovi = (q) => {
    if (!q.trim()) {
      fetchDijelovi();
      return;
    }
    fetch(`http://localhost:8081/dijelovi/pretrazi?q=${q}`)
      .then(res => res.json())
      .then(data => setDijelovi(data))
      .catch(err => console.error("Greška:", err));
  };

  useEffect(() => {
    fetchDijelovi();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchDijelovi(search);
    }, 300); // debounce 300ms
    return () => clearTimeout(timeout);
  }, [search]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8081/dijelovi/delete/${id}`, { method: "DELETE" });
    fetchDijelovi();
  };

  return (
    <div>
      <h2>Dijelovi</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Pretraži po nazivu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => setShowPopup(true)}>Dodaj dio</button>

      {dijelovi.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Cijena</th>
              <th>Stanje</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {dijelovi.map(d => (
              <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.Naziv}</td>
                <td>{d.Cijena} €</td>
                <td>{d.Stanje}</td>
                <td>
                  <button onClick={() => { setSelectedDio(d); setShowEditPopup(true); }}>Edit</button>
                  <button onClick={() => handleDelete(d.ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nema dijelova.</p>
      )}

      {showPopup && (
        <DodajDioPopUp
          onClose={() => setShowPopup(false)}
          onAdded={() => {
            setShowPopup(false);
            fetchDijelovi();
          }}
        />
      )}

      {showEditPopup && (
        <EditDioPopUp
          dio={selectedDio}
          onClose={() => setShowEditPopup(false)}
          onUpdated={() => {
            setShowEditPopup(false);
            fetchDijelovi();
          }}
        />
      )}
    </div>
  );
};

export default DijeloviTable;
