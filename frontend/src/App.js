import React, { use, useState } from 'react';
import Login from './Login';
import Register from './Register';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import RadnikDashboard from './RadnikDashboard';

function App() {
  const [user, setUser] = useState(null); 
  const [showRegister, setShowRegister] = useState(false);

  if (user) {
    // Ulogovan korisnik
    return (
      <div style={{ padding: 20, position: 'relative' }}>
        {user.role === 'admin' ? (
          <div>
            <AdminDashboard user={user}/>
          </div>
        ) : (
          user.role === 'radnik' ? (
            <div>
              <RadnikDashboard user={user}/>
            </div>
          ) : (
          <div>
            <ClientDashboard user={user}/>
          </div>
          )
        )}
        <button style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '8px 16px',
            backgroundColor: '#f00',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',}} 
            onClick={() => setUser(null)}>Logout</button>
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
