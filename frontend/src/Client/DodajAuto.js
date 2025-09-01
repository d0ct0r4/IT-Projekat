import React, { useState } from 'react';

const DodajAuto = ({ onClose, onSubmit }) => {
    const [vin, setVin] = useState('');
    const [registracija, setRegistracija] = useState('');
    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [godiste, setGodiste] = useState(null);
    
    const formStyles = {
        display: "grid",
        gridTemplateColumns: "150px 1fr", // prva kolona fiksna za label, druga za input
        gap: "10px",
        alignItems: "center",
        maxWidth: "400px"
      };
    
      const labelStyles = {
        textAlign: "right",
        paddingRight: "50px"
      };
    
      const inputStyles = {
        padding: "5px",
        width: "100%"
      };
    

    const handleSubmit = () => {
        if(onSubmit) onSubmit({vin, registracija, marka, model, godiste});
        if(onClose) onClose();
    };

    return (
      <div
        className="modal-overlay"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal-card"
        >
            <div className="modal-close" style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1 className="modal-title">Preuzmi</h1>
                <button onClick={onClose}
                style={{
                    background: 'red',
                    color: 'white',
                    borderRadius: '5px'
                }
                }>X</button>
            </div>

            <form style={formStyles}>
                <label style={labelStyles}>VIN:</label>
                <input type="text" placeholder="VIN" style={inputStyles} onChange={(e) => setVin(e.target.value)}/>

                <label style={labelStyles}>Registracija:</label>
                <input type="text" placeholder="Registracija" style={inputStyles} onChange={(e) => setRegistracija(e.target.value)}/>

                <label style={labelStyles}>Marka:</label>
                <input type="text" placeholder="Marka" style={inputStyles} onChange={(e) => setMarka(e.target.value)}/>

                <label style={labelStyles}>Model:</label>
                <input type="text" placeholder="Model" style={inputStyles} onChange={(e) => setModel(e.target.value)}/>

                <label style={labelStyles}>Godište:</label>
                <input type="number" placeholder="Godište" style={inputStyles} onChange={(e) => setGodiste(e.target.value)}/>
            </form>

          <button onClick={handleSubmit}>Dodaj</button>
        </div>
      </div>
    );
  };
  
  export default DodajAuto;
  