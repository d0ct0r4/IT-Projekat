import React, { useEffect, useState } from 'react';

const RacunTable = ({ user }) => {
  const [racuni, setRacuni] = useState([]);
  const [racunDjelovi, setRacunDjelovi] = useState({});
  const [expandedRacun, setExpandedRacun] = useState(null);

  useEffect(() => {
    if (user?.linked_id) {
      fetch(`http://localhost:8081/racun/client/${user.linked_id}`)
        .then((res) => res.json())
        .then((data) => setRacuni(data))
        .catch((err) => {
          console.error('Greška pri dohvaćanju racuna:', err);
          setRacuni([]);
        });
    }
  }, [user]);

  const toggleDjelovi = (racunId) => {
    if (expandedRacun === racunId) {
      setExpandedRacun(null);
      return;
    }

    if (!racunDjelovi[racunId]) {
      fetch(`http://localhost:8081/racunDjelovi/client/${racunId}`)
        .then((res) => res.json())
        .then((data) => {
          setRacunDjelovi((prev) => ({ ...prev, [racunId]: data }));
          setExpandedRacun(racunId);
        })
        .catch((err) => console.error('Greška pri dohvaćanju racunDjelova:', err));
    } else {
      setExpandedRacun(racunId);
    }
  };

  return (
    <div>
      <h2>Moji Racuni</h2>
      {racuni.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Musterije</th>
              <th>ID Popravke</th>
              <th>Datum</th>
              <th>Sati</th>
              <th>Cena</th>
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {racuni.map((racun, idx) => (
              <React.Fragment key={idx}>
                <tr>
                  <td>{racun.ID}</td>
                  <td>{racun.Musterija_ID}</td>
                  <td>{racun.Popravka_ID}</td>
                  <td>{racun.Datum}</td>
                  <td>{racun.sati}</td>
                  <td>{racun.Cena}€</td>
                  <td>
                    <button onClick={() => toggleDjelovi(racun.ID)}>
                      {expandedRacun === racun.ID ? '↑' : '↓'}
                    </button>
                  </td>
                </tr>
                {expandedRacun === racun.ID && racunDjelovi[racun.ID] && (
                  <tr>
                    <td colSpan={Object.keys(racun).length + 1}>
                      {racunDjelovi[racun.ID].length > 0 ? (
                        <table>
                          <thead>
                            <tr>
                              <th>ID Racuna</th>
                              <th>Ime Dijela</th>
                              <th>Kolicina</th>
                              <th>Cijena</th>
                            </tr>
                          </thead>
                          <tbody>
                            {racunDjelovi[racun.ID].map((dio, i) => (
                              <tr key={i}>
                                <td>{dio.RacunID}</td>
                                <td>{dio.DioNaziv}</td>
                                <td>{dio.Kolicina}</td>
                                <td>{dio.Cijena}€</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>Nema dijelova za ovaj račun.</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nemate racune.</p>
      )}
    </div>
  );
};

export default RacunTable;
