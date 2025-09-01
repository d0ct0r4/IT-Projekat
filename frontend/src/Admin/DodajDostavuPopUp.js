import React, { useState, useEffect } from "react";

const DodajDostavuPopUp = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    Datum: "",
    dijelovi: []
  });
  const [djelovi, setDjelovi] = useState([]);
  const [stavka, setStavka] = useState({ DioID: "", Kolicina: "" });

  useEffect(() => {
    fetch("http://localhost:8081/dijelovi")
      .then(res => res.json())
      .then(setDjelovi)
      .catch(err => console.error("Greška:", err));
  }, []);

  // Kada odaberem dio, uzmi njegovu cijenu
  const handleSelectDio = (id) => {
    const dio = djelovi.find(d => d.ID === parseInt(id));
    setStavka({ DioID: id, Kolicina: "", Cena: dio ? dio.Cijena : "" });
  };

  const handleAddStavka = () => {
    if (!stavka.DioID || !stavka.Kolicina) {
      alert("Odaberi dio i unesi količinu!");
      return;
    }
    setFormData(prev => ({
      ...prev,
      dijelovi: [...prev.dijelovi, stavka]
    }));
    setStavka({ DioID: "", Kolicina: "", Cena: "" });
  };

  const handleSubmit = () => {
    fetch("http://localhost:8081/dostava/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        alert("Dostava dodana!");
        onSuccess();
      })
      .catch(err => console.error("Greška:", err));
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-card"
      >
        <button
          onClick={onClose}
          className="modal-close"
        >
          ✖
        </button>
        <h2 className="modal-title">Dodaj dostavu</h2>

        <label>Datum:</label>
        <input
          type="date"
          value={formData.Datum}
          onChange={e => setFormData({ ...formData, Datum: e.target.value })}
        />

        <hr />
        <h3>Stavke</h3>
        <select value={stavka.DioID} onChange={e => handleSelectDio(e.target.value)}>
          <option value="">-- odaberi dio --</option>
          {djelovi.map(d => (
            <option key={d.ID} value={d.ID}>{d.Naziv} ({d.Cijena} €)</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Kolicina"
          value={stavka.Kolicina}
          onChange={e => setStavka({ ...stavka, Kolicina: e.target.value, Cena: stavka.Cena })}
        />
        <button onClick={handleAddStavka}>Dodaj stavku</button>

        <ul>
          {formData.dijelovi.map((s, i) => {
            const dio = djelovi.find(d => d.ID === parseInt(s.DioID));
            return (
              <li key={i}>
                {dio ? dio.Naziv : "Nepoznat"} – {s.Kolicina} kom – {s.Cena} €
              </li>
            );
          })}
        </ul>

        <div style={{ marginTop: "15px" }}>
          <button
            onClick={handleSubmit}
            style={{
              background: "green", color: "#fff",
              padding: "10px 15px", border: "none", borderRadius: "5px"
            }}
          >
            Sačuvaj
          </button>
        </div>
      </div>
    </div>
  );
};

export default DodajDostavuPopUp;
