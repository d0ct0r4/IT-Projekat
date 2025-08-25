import React, { useEffect, useState } from 'react';
import RegistracijaPopUp from './RegistracijaPopUp';

const KorisniciTable = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchUsers = () => {
    fetch('http://localhost:8081/auth/')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => {
        console.error('Greška pri dohvaćanju korisnika:', err);
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Da li ste sigurni da želite obrisati korisnika?")) return;

    fetch(`http://localhost:8081/auth/delete/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setUsers(prev => prev.filter(user => user.ID !== id));
          alert('Korisnik obrisan!');
        } else {
          throw new Error('Brisanje nije uspjelo');
        }
      })
      .catch(err => {
        console.error('Greška pri brisanju korisnika:', err);
        alert('Greška pri brisanju korisnika');
      });
  };

  const handleRegister = (userData) => {
    fetch('http://localhost:8081/auth/registerStaff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(() => {
        alert('Korisnik uspješno registrovan!');
        setShowPopup(false);
        fetchUsers();
      })
      .catch(err => {
        console.error('Greška pri registraciji:', err);
        alert('Greška pri registraciji korisnika');
      });
  };

  return (
    <div>
      <h2>Svi korisnici</h2>
      <button onClick={() => setShowPopup(true)} style={{ marginBottom: '10px' }}>
        Registruj korisnika
      </button>

      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password Hash</th>
              <th>Role</th>
              <th>Linked ID</th>
              <th>Radnik JMBG</th>
              <th>Created At</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.username}</td>
                <td>{user.password_hash}</td>
                <td>{user.role}</td>
                <td>{user.linked_id || '-'}</td>
                <td>{user.radnik_jmbg || '-'}</td>
                <td>{user.created_at}</td>
                <td>
                  <button onClick={() => handleDelete(user.ID)}>Obriši</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nema korisnika.</p>
      )}

      {showPopup && (
        <RegistracijaPopUp
          onClose={() => setShowPopup(false)}
          onSubmit={handleRegister}
        />
      )}
    </div>
  );
};

export default KorisniciTable;
