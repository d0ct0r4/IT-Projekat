import React, { useState } from "react";

const EditRadnikPopup = ({ radnik, onClose, onSaved }) => {
  const [iskustvo, setIskustvo] = useState(radnik.Godine_Iskustva);
  const [satnica, setSatnica] = useState(radnik.Satnica);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8081/radnici/update/${radnik.JMBG}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Godine_Iskustva: iskustvo, Satnica: satnica}),
    });

    onSaved();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
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

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Izmijeni radnika
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="number"
            placeholder="Godine iskustva"
            value={iskustvo}
            onChange={(e) => setIskustvo(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            required
          />
          <input
            type="number"
            placeholder="Satnica"
            value={satnica}
            onChange={(e) => setSatnica(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
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
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#45a049")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#4CAF50")
            }
          >
            Spremi
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRadnikPopup;
