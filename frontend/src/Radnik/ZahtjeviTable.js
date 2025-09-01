import React, { useEffect, useState } from "react";
import Zavrsi from "./Zavrsi";

const ZahtjeviTable = ({ user }) => {
  const [zahtjevi, setZahtjevi] = useState([]);
  const [zavrsiID, setZavrsiID] = useState(null);

  const refreshZahtjevi = () => {
    fetch(`http://localhost:8081/zahtjevi/`)
      .then((res) => res.json())
      .then((data) => setZahtjevi(data))
      .catch(() => setZahtjevi([]));
  };

  useEffect(() => {
    refreshZahtjevi();
  }, [user]);

  const handlePreuzmi = (id, vin, musterija_id) => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];

    fetch("http://localhost:8081/zahtjevi/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        radnik_jmbg: user?.radnik_jmbg,
        Auto_VIN: vin,
        pocetak_datum: formatted,
        musterija_id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Zahtjev uspješno preuzet!");
        refreshZahtjevi();
      })
      .catch((err) => {
        console.error("Greška:", err);
        alert("Greška pri preuzimanju zahtjeva.");
      });
  };

  const handleZavrsi = async (sati, file, musterija_id, popravka_id, cena, zahtjev_id, koristeniDijelovi) => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("musterija_id", musterija_id);
    formData.append("popravka_id", popravka_id);
    formData.append("datum", formatted);
    formData.append("sati", sati);
    formData.append("cena", cena);
    formData.append("zahtjev_id", zahtjev_id);
    formData.append("radnik_jmbg", user?.radnik_jmbg);
    koristeniDijelovi.forEach((d, i) => {
      formData.append(`dijelovi[${i}][dioID]`, d.dioID);
      formData.append(`dijelovi[${i}][kolicina]`, d.kolicina);
    });
    if (file) formData.append("slika", file);

    try {
      const res = await fetch("http://localhost:8081/racun/stampaj", {
        method: "POST",
        body: formData,
      });
      await res.json();
      alert("Zahtjev završen!");
      refreshZahtjevi();
      setZavrsiID(null);
    } catch (err) {
      console.error(err);
      alert("Greška pri završavanju zahtjeva.");
    }
  };

  return (
    <div>
      <h2>Moja Vozila</h2>
      {zahtjevi.length > 0 ? (
        <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Musterije</th>
              <th>JMBG Radnika</th>
              <th>VIN</th>
              <th>ID Popravke</th>
              <th>Datum Slanja</th>
              <th>Status</th>
              <th>Opis</th>
            </tr>
          </thead>
          <tbody>
            {zahtjevi.map((z, idx) => (
              <tr key={idx}>
                <td>{z.ID}</td>
                <td>{z.musterija_ID}</td>
                <td>{z.radnik_JMBG}</td>
                <td>{z.VIN}</td>
                <td>{z.popravka_ID}</td>
                <td>{z.poslan_datum}</td>
                <td>
                  {z.preuzet === 0
                    ? "Nije preuzeto"
                    : z.preuzet === 1
                    ? "Preuzeto"
                    : "Završeno"}
                </td>
                <td>{z.naziv}</td>
                <td>
                  {z.preuzet === 0 && (
                    <button onClick={() => handlePreuzmi(z.ID, z.VIN, z.musterija_ID)}>
                      Preuzmi
                    </button>
                  )}
                  {z.preuzet === 1 && (
                    <>
                      <button onClick={() => setZavrsiID(z.ID)}>Završi</button>
                      {zavrsiID === z.ID && (
                        <Zavrsi
                          onClose={() => setZavrsiID(null)}
                          onSubmit={({ sati, file, koristeniDijelovi }) => {
                            handleZavrsi(
                              sati,
                              file,
                              z.musterija_ID,
                              z.popravka_ID,
                              10,
                              z.ID,
                              koristeniDijelovi
                            );
                          }}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>Nemate zahtjeve.</p>
      )}
    </div>
  );
};

export default ZahtjeviTable;
