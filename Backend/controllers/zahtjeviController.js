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

exports.preuzetZahtjev = (req, res) => {
  const {id, radnik_jmbg, Auto_VIN, naziv, pocetak_datum, musterija_id }= req.body;

  const sql1 = `INSERT INTO popravka (JMBG_Radnik, Auto_VIN, Naziv, Pocetak_Datum, musterija_id) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql1, [radnik_jmbg, Auto_VIN, naziv, pocetak_datum, musterija_id], (errInsert, resultInsert) => {
    if (errInsert) {
      console.error('Greška pri insertu popravke:', errInsert);
      return res.status(500).json({ error: 'Database error kod inserta' });
    }

    const popravkaID = resultInsert.insertId;

    const sql2 = `UPDATE zahtjevi SET radnik_jmbg = ?, preuzet = 1, popravka_ID = ? WHERE ID = ?`;
    db.query(sql2, [radnik_jmbg, popravkaID, id], (errUpdate, resultUpdate) => {
      if (errUpdate) {
        console.error('Greška pri update-u zahtjeva:', errUpdate);
        return res.status(500).json({ error: 'Database error kod update-a' });
      }

      res.json({
        insertPopravka: resultInsert,
        updateZahtjev: resultUpdate,
        popravkaID: popravkaID
      });
    });
  });
};


exports.deleteZahtjev = (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM zahtjevi WHERE ID = ?';
    db.query(sql, id, (err, result) => {
      if(err){
        console.error('Greska pri upitu:', err);
        return res.status(500).json({error: 'Database error'});
      }

      res.json(result)
    })
}

exports.getZahtjeviByVin = (req, res) => {
    const vin = req.params.vin;

    const sql = `SELECT ID, musterija_ID, radnik_JMBG, VIN, popravka_ID, DATE_FORMAT(poslan_datum,'%Y-%m-%d'), preuzet FROM zahtjevi WHERE VIN = ?`
    db.query(sql, vin, (err, result) => {
      if(err) {
        console.error('Greska pri upitu:', err);
        return res.status(500).json({error: 'Database error'});
      }

      res.json(result);
    })
}