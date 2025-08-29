import React, { useEffect, useState } from "react";

const AutaTable = () => {
  const [auta, setAuta] = useState([]);
  const [search, setSearch] = useState("");
  const [marke, setMarke] = useState([]);
  const [modeli, setModeli] = useState([]);
  const [filterMarka, setFilterMarka] = useState("");
  const [filterModel, setFilterModel] = useState("");

  // Dohvati sva auta
  const fetchAuta = () => {
    fetch("http://localhost:8081/auto")
      .then((res) => res.json())
      .then((data) => setAuta(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAuta();

    // Dohvati marke
    fetch("http://localhost:8081/auto/marke")
      .then((res) => res.json())
      .then((data) => {console.log(data);setMarke(data)})
      .catch((err) => console.error(err));
  }, []);

  // Dohvati modele kada se odabere marka
  useEffect(() => {
    if (filterMarka) {
      fetch(`http://localhost:8081/auto/modeli/${filterMarka}`)
        .then((res) => res.json())
        .then((data) => setModeli(data))
        .catch((err) => console.error(err));
    } else {
      setModeli([]);
      setFilterModel("");
    }
  }, [filterMarka]);

  const handleDelete = (vin) => {
    if (!window.confirm("Da li ste sigurni da želite obrisati vozilo?")) return;
    fetch(`http://localhost:8081/auto/delete/${vin}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setAuta((prev) => prev.filter((a) => a.VIN !== vin));
          alert("Auto obrisan!");
        }
      })
      .catch((err) => console.error(err));
  };

  // Search/filter
  const handleFilter = () => {
    const params = new URLSearchParams({
      q: search,
      marka: filterMarka,
      model: filterModel,
    });
    fetch(`http://localhost:8081/auto/search?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setAuta(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Sva Vozila</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Pretraži po VIN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterMarka} onChange={(e) => setFilterMarka(e.target.value)}>
          <option value="">Sve marke</option>
          {marke.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        {modeli.length > 0 && (
          <select value={filterModel} onChange={(e) => setFilterModel(e.target.value)}>
            <option value="">Svi modeli</option>
            {modeli.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
        <button onClick={handleFilter}>Filter</button>
      </div>

      {auta.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>VIN</th>
              <th>ID Vlasnika</th>
              <th>Registracija</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Godiste</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {auta.map((auto) => (
              <tr key={auto.VIN}>
                <td>{auto.VIN}</td>
                <td>{auto.Vlasnik_ID}</td>
                <td>{auto.Registracija}</td>
                <td>{auto.Marka}</td>
                <td>{auto.Model}</td>
                <td>{auto.Godiste}</td>
                <td>
                  <button onClick={() => handleDelete(auto.VIN)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nema auta.</p>
      )}
    </div>
  );
};

export default AutaTable;
