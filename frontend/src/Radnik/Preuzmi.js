import React, { useState } from 'react';

const Preuzmi = ({ onClose, onSubmit }) => {
    const [text, setText] = useState('');
    
    const handleSubmit = () => {
        if(onSubmit) onSubmit({text});
        if(onClose) onClose();
    };

    return (
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.10)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px',
            zIndex: 1001,
            boxShadow: '0 0 10px rgba(0,0,0,0.25)',
          }}
        >
            <div style={{ display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '10px' 
                        }}>
                <h1>Preuzmi</h1>
                <button onClick={onClose}
                style={{
                    background: 'red',
                    color: 'white',
                    borderRadius: '5px'
                }
                }>X</button>
            </div>
          
          
          <textarea
            id="naziv"
            placeholder="Unesite opis"
            rows={4}
            style={{ width: '100%' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button onClick={handleSubmit}>Pošalji</button>
        </div>
      </div>
    );
  };
  
  export default Preuzmi;
  