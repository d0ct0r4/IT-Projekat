const db = require('../db');
const path = require('path');

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
  
exports.printRacun = (req, res) => {
    const {musterija_id, popravka_id, datum, sati, cena, zahtjev_id} = req.body;
    const slika = req.file ? `/uploads/${req.file.filename}` : null;

    const popravkaSql = `UPDATE popravka SET Kraj_Datum = ?, slika = ? WHERE ID = ?`;

    db.query(popravkaSql, [datum, slika, popravka_id], (err1, result1) => {
      if(err1) {
        console.error('Greska pri update-u:', err1);
        return res.status(500).json({ error: 'Database error' });
      }

      const racunSql = 'INSERT INTO racun(Musterija_ID, Popravka_ID, Datum, sati, Cena) VALUES (?, ?, ?, ?, ?)';
      db.query(racunSql, [musterija_id, popravka_id, datum, sati, cena], (err2, result2) => {
        if(err2) {
          console.error('Greska pri insertu:', err2);
          return res.status(500).json({ error: 'Database error' });
        }

        const zahtjevSql = 'UPDATE zahtjevi SET preuzet = 2 WHERE ID = ?';
        db.query(zahtjevSql, [zahtjev_id], (err3, result3) => {
            if(err3) {
              console.error('Greska pri update:', err3);
              return res.status(500).json({ error: 'Database error' });
            } 

            res.json(result1, result2, result3);
        })
      })
    })
}