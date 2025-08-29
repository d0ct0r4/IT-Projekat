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
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "30px 25px",
          borderRadius: "15px",
          minWidth: "400px",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          position: "relative",
        }}
      >
        {/* X dugme */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            border: "none",
            background: "transparent",
            fontSize: "22px",
            cursor: "pointer",
            color: "#888",
          }}
        >
          ✖
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.5rem", fontWeight: "bold" }}>
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
