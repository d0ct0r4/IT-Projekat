import React, { useState } from 'react';

const Zavrsi = ({ onClose, onSubmit }) => {
    const [file, setFile] = useState(null)
    const [sati, setSati] = useState('');
    
    const handleSubmit = () => {
        if(onSubmit) onSubmit({sati, file});
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
                <h1>Zavrsi</h1>
                <button onClick={onClose}
                style={{
                    background: 'red',
                    color: 'white',
                    borderRadius: '5px'
                }
                }>X</button>
            </div>
          
          
          <input type='file' id='slika' accept="image/*" onChange={e => setFile(e.target.files[0])}></input> <br /> <br />
          <input type='text' id="sati" placeholder='Sati'></input> <br /> <br />
          <button onClick={handleSubmit}>Pošalji</button>
        </div>
      </div>
    );
  };
  
  export default Zavrsi;
  