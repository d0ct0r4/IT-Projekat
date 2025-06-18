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