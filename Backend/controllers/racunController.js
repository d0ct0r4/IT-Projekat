const db = require('../db');

exports.getAllRacun = (req, res) => {
    db.query("SELECT * FROM racun", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getRacunByClient = (req, res) => {
    const clientId = req.params.id;
  
    console.log(clientId);
  
    const sql = 'SELECT * FROM racun WHERE Musterija_ID = ?';
    db.query(sql, [clientId], (err, results) => {
      if (err) {
        console.error('Greška pri upitu:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(results);
    });
  };
  