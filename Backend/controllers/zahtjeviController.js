const db = require('../db');

exports.getAllZahtjevi = (req, res) => {
    db.query("SELECT * FROM zahtjevi", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getZahtjeviByClient = (req, res) => {
    const clientId = req.params.id;
  
    const sql = 'SELECT * FROM zahtjevi WHERE musterija_ID = ?';
    db.query(sql, [clientId], (err, results) => {
      if (err) {
        console.error('Greška pri upitu:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(results);
    });
  };

  exports.insertZahtjev = (req, res) => {
    const {musterija_ID, Vin, poslan_datum} = req.body;
  
    const sql = 'INSERT INTO zahtjevi (musterija_ID, VIN, poslan_datum, preuzet) VALUES (?, ?, ?, FALSE)';
    db.query(sql, [musterija_ID, Vin, poslan_datum], (err, result) => {
      if (err) {
        console.error('Greška pri unosu zahtjeva:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(result);
    });
  };