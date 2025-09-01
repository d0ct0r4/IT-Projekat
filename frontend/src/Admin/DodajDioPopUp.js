import React, { useState } from "react";

const DodajDioPopUp = ({ onClose, onAdded }) => {
  const [naziv, setNaziv] = useState("");
  const [cijena, setCijena] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8081/dijelovi/dodaj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Naziv: naziv, Cijena: cijena, Stanje: "0" }),
    });

    onAdded();
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
        {/* X dugme */}
        <button
          onClick={onClose}
          className="modal-close"
        >
          ✖
        </button>

        <h2 className="modal-title">
          Dodaj dio
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Naziv"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            required
          />
          <input
            type="number"
            placeholder="Cijena"
            value={cijena}
            onChange={(e) => setCijena(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={e => e.target.style.backgroundColor = "#45a049"}
            onMouseLeave={e => e.target.style.backgroundColor = "#4CAF50"}
          >
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
};

export default DodajDioPopUp;
