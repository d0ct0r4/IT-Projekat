const db = require('../db');

exports.getAllPopravka = (req, res) => {
    db.query("SELECT * FROM popravka", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};


exports.getPopravkaByClient = (req, res) => {
    const clientId = req.params.id;
  
    console.log(clientId);
  
    const sql = 'SELECT * FROM popravka WHERE musterija_id = ?';
    db.query(sql, [clientId], (err, results) => {
      if (err) {
        console.error('Greška pri upitu:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(results);
    });
  };