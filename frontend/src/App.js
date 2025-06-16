import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function App() {
  const [user, setUser] = useState(null); 
  const [showRegister, setShowRegister] = useState(false);

  if (user) {
    // Ulogovan korisnik
    return (
      <div style={{ padding: 20 }}>
        <h2>Welcome, {user.username}</h2>
        {user.role === 'admin' ? (
          <div>
            <h3>Admin Dashboard (placeholder)</h3>
          </div>
        ) : (
          <div>
            <h3>Client Dashboard (placeholder)</h3>
          </div>
        )}
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }

  // Ako nije ulogovan, prikaži login ili register
  return (
    <div>
      {showRegister ? (
        <>
          <Register onRegister={() => setShowRegister(false)} />
          <p>
            Imate nalog?{' '}
            <button onClick={() => setShowRegister(false)}>Loginujte se</button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={setUser} />
          <p>
            Nemate nalog?{' '}
            <button onClick={() => setShowRegister(true)}>Registrujte se</button>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
