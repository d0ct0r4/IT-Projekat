import React, { useEffect, useState } from "react";
import EditRadnikPopup from "./EditRadnikPopup";

const RadniciTable = () => {
  const [automehanicari, setAutomehanicari] = useState([]);
  const [elektricari, setElektricari] = useState([]);
  const [selectedRadnik, setSelectedRadnik] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:8081/radnici/automehanicari")
      .then((res) => res.json())
      .then(setAutomehanicari);

    fetch("http://localhost:8081/radnici/elektricari")
      .then((res) => res.json())
      .then(setElektricari);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold">Automehaničari</h2>
      <div className="table-responsive">
      <table className="border w-full mb-6">
        <thead>
          <tr>
            <th>JMBG</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Datum Rođenja</th>
            <th>Telefon</th>
            <th>Iskustvo</th>
            <th>Satnica</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {automehanicari.map((a) => (
            <tr key={a.JMBG}>
              <td>{a.JMBG}</td>
              <td>{a.Ime}</td>
              <td>{a.Prezime}</td>
              <td>{a.Datum_Rodjenja}</td>
              <td>{a.Broj_Telefona}</td>
              <td>{a.Godine_Iskustva}</td>
              <td>{a.Satnica}</td>
              <td>
                <button onClick={() => setSelectedRadnik(a)}>Izmijeni</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-bold">Električari</h2>
      <table className="border w-full mb-6">
        <thead>
          <tr>
            <th>JMBG</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Datum Rođenja</th>
            <th>Telefon</th>
            <th>Iskustvo</th>
            <th>Satnica</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {elektricari.map((e) => (
            <tr key={e.JMBG}>
              <td>{e.JMBG}</td>
              <td>{e.Ime}</td>
              <td>{e.Prezime}</td>
              <td>{e.Datum_Rodjenja}</td>
              <td>{e.Broj_Telefona}</td>
              <td>{e.Godine_Iskustva}</td>
              <td>{e.Satnica}</td>
              <td>
                <button onClick={() => setSelectedRadnik(e)}>Izmijeni</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {selectedRadnik && (
        <EditRadnikPopup
          radnik={selectedRadnik}
          onClose={() => setSelectedRadnik(null)}
          onSaved={() => {
            fetchData();
            setSelectedRadnik(null);
          }}
        />
      )}
    </div>
  );
};

export default RadniciTable;
