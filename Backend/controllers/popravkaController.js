const db = require('../db');

exports.getAllPopravka = (req, res) => {
    db.query("SELECT ID, JMBG_Radnik, Auto_VIN, Naziv, DATE_FORMAT(Pocetak_Datum, '%Y-%m-%d') as Pocetak_Datum, DATE_FORMAT(Kraj_Datum, '%Y-%m-%d') as Kraj_Datum, musterija_id, slika FROM popravka", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};


exports.getPopravkaByClient = (req, res) => {
    const clientId = req.params.id;
  
    console.log(clientId);
  
    const sql = `SELECT ID, JMBG_Radnik, Auto_VIN, Naziv, DATE_FORMAT(Pocetak_Datum, '%Y-%m-%d') as Pocetak_Datum, DATE_FORMAT(Kraj_Datum, '%Y-%m-%d') as Kraj_Datum, musterija_id, slika FROM popravka WHERE musterija_id = ?`;
    db.query(sql, [clientId], (err, results) => {
      if (err) {
        console.error('Greška pri upitu:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(results);
    });
  };