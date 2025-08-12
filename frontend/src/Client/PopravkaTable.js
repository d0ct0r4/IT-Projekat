import React, { useEffect, useState } from 'react';

const PopravkaTable = ({ user }) => {
  const [popravke, setPopravke] = useState([]);
  const [popupSlika, setPopupSlika] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/popravka/client/${user.linked_id}`)
    .then((res) => res.json())
    .then((data) => setPopravke(data))
    .catch((err) => {
        console.error('Greška pri dohvaćanju popravki:', err);
        setPopravke([]);
    });
  }, [user]);

  return (
    <div>
      <h2>Moje Popravke</h2>
      {popravke.length > 0 ? (
        <table>
          <thead>
            <tr>
                <th>ID</th>
                <th>JMBG Radnika</th>
                <th>VIN</th>
                <th>Opis</th>
                <th>Datum Pocetka</th>
                <th>Datum Kraja</th>
                <th>ID Musterije</th>
                <th>Slika</th>
            </tr>
          </thead>
          <tbody>
            {popravke.map((popravka, idx) => (
              <tr key={idx}>
                {Object.values(popravka).map((val, i) => (
                  <td key={i}>
                  {i === 7 ? (
                    val != null ?(
                    <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setPopupSlika(`http://localhost:8081/${val}`)}
                  >
                    Vidi sliku
                  </span>) : <p>Nema slike</p>
                  ) : (
                    val
                  )}
                </td>
                  
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nemate popravke.</p>
      )}

        {popupSlika && (
                <div
                    onClick={() => setPopupSlika(null)}
                    style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    }}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        minWidth: '300px',
                        zIndex: 1001,
                        boxShadow: '0 0 10px rgba(0,0,0,1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                    >
                    <h3>Slika auta</h3>
                    <img
                        src={popupSlika}
                        alt="popup"
                        style={{
                        maxWidth: '100%',
                        maxHeight: '60vh',
                        borderRadius: '6px',
                        }}
                    />
                    <button
                        onClick={() => setPopupSlika(null)}
                        style={{
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        }}
                    >
                        Zatvori
                    </button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default PopravkaTable;