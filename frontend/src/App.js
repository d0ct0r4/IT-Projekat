import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';
import RadnikDashboard from './RadnikDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (user) {
    return (
      <div style={{ padding: 20, position: 'relative' }}>
        {user.role === 'admin' ? (
          <AdminDashboard user={user}/>
        ) : user.role === 'radnik' ? (
          <RadnikDashboard user={user}/>
        ) : (
          <ClientDashboard user={user}/>
        )}
        <button
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '8px 16px',
            backgroundColor: '#f00',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={() => setUser(null)}
        >
          Logout
        </button>
      </div>
    );
  }

  // neulogovan
  return showRegister ? (
    <Register onRegister={() => setShowRegister(false)} onSwitch={() => setShowRegister(false)} />
  ) : (
    <Login onLogin={setUser} onSwitch={() => setShowRegister(true)} />
  );
}

export default App;
