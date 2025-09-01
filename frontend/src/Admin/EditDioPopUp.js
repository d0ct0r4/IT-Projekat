import React, { useState, useEffect } from "react";

const EditDioPopUp = ({ dio, onClose, onUpdated }) => {
  const [naziv, setNaziv] = useState("");
  const [cijena, setCijena] = useState("");
  const [stanje, setStanje] = useState("");

  useEffect(() => {
    if (dio) {
      setNaziv(dio.Naziv);
      setCijena(dio.Cijena);
      setStanje(dio.Stanje);
    }
  }, [dio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8081/dijelovi/edit/${dio.ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Naziv: naziv, Cijena: cijena, Stanje: stanje }),
    });

    onUpdated();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=""
      >
        {/* X dugme */}
        <button
          onClick={onClose}
          className="modal-close"
        >
          ✖
        </button>

        <h2 className="modal-title">
          Izmijeni dio
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
          <input
            type="number"
            placeholder="Stanje"
            value={stanje}
            onChange={(e) => setStanje(e.target.value)}
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
            Sačuvaj
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDioPopUp;
