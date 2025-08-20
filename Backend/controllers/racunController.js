const db = require('../db');
const path = require('path');

exports.getAllRacun = (req, res) => {
    db.query(`SELECT ID, Musterija_ID, Popravka_ID, DATE_FORMAT(Datum, '%Y-%m-%d') as Datum, sati, Cena FROM racun`, (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getRacunByClient = (req, res) => {
    const clientId = req.params.id;
    
    const sql = `SELECT ID, Musterija_ID, Popravka_ID, DATE_FORMAT(Datum, '%Y-%m-%d') as Datum, sati, Cena FROM racun WHERE Musterija_ID = ?`;
    db.query(sql, [clientId], (err, results) => {
      if (err) {
        console.error('Greška pri upitu:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(results);
    });
  };
  
  exports.printRacun = (req, res) => {
    const { musterija_id, popravka_id, datum, sati, cena, zahtjev_id, dijelovi } = req.body;
    const slika = req.file ? `/uploads/${req.file.filename}` : null;
  
    const popravkaSql = `UPDATE popravka SET Kraj_Datum = ?, slika = ? WHERE ID = ?`;
    db.query(popravkaSql, [datum, slika, popravka_id], (err1) => {
      if (err1) {
        console.error('Greska pri update-u popravke:', err1);
        return res.status(500).json({ error: 'Database error' });
      }
  
      const racunSql = 'INSERT INTO racun(Musterija_ID, Popravka_ID, Datum, sati, Cena) VALUES (?, ?, ?, ?, ?)';
      db.query(racunSql, [musterija_id, popravka_id, datum, sati, cena], (err2, result2) => {
        if (err2) {
          console.error('Greska pri insertu racuna:', err2);
          return res.status(500).json({ error: 'Database error' });
        }
  
        const racunID = result2.insertId;
  
        if (Array.isArray(dijelovi) && dijelovi.length > 0) {
          let queries = dijelovi.map(d => {
            return new Promise((resolve, reject) => {
              const insertStavka = "INSERT INTO racun_djelovi (RacunID, DioID, Kolicina) VALUES (?, ?, ?)";
              db.query(insertStavka, [racunID, d.dioID, d.kolicina], (err) => {
                if (err) return reject(err);
  
                const updateDio = "UPDATE dijelovi SET Stanje = Stanje - ? WHERE ID = ?";
                db.query(updateDio, [d.kolicina, d.dioID], (err2) => {
                  if (err2) return reject(err2);
                  resolve();
                });
              });
            });
          });
  
          Promise.all(queries)
            .then(() => {
              const zahtjevSql = 'UPDATE zahtjevi SET preuzet = 2 WHERE ID = ?';
              db.query(zahtjevSql, [zahtjev_id], (err3) => {
                if (err3) {
                  console.error('Greska pri update zahtjeva:', err3);
                  return res.status(500).json({ error: 'Database error' });
                }
                res.json({ message: 'Račun uspješno kreiran', racunID });
              });
            })
            .catch(err => {
              console.error('Greška pri ubacivanju dijelova:', err);
              return res.status(500).json({ error: 'Database error kod dijelova' });
            });
  
        } else {
          const zahtjevSql = 'UPDATE zahtjevi SET preuzet = 2 WHERE ID = ?';
          db.query(zahtjevSql, [zahtjev_id], (err3) => {
            if (err3) {
              console.error('Greska pri update zahtjeva:', err3);
              return res.status(500).json({ error: 'Database error' });
            }
            res.json({ message: 'Račun uspješno kreiran', racunID });
          });
        }
      });
    });
  };
  