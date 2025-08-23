const { json } = require('express');
const db = require('../db');

exports.getAllAuto = (req, res) => {
    db.query("SELECT * FROM auto", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getCarsByClient = (req, res) => {
  const clientId = req.params.id;

  const sql = 'SELECT * FROM auto WHERE Vlasnik_ID = ?';
  db.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error('Greška pri upitu:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
};

exports.deleteCarsByVIN = (req, res) => {
    const vin = req.params.vin;

    const sql = 'DELETE FROM auto WHERE VIN = ?';
    db.query(sql, [vin], (err, results) => {
        if(err){
            console.error('Greska pri brisanju: ', err);
            return res.status(500),json({error : 'Delete error' });
        }

        res.json(results);
    })
}

exports.insertAuto = (req, res) => {
    const { Vin, Marka, Model, Godiste, Registracija, Vlasnik_ID } = req.body;
  
    const sql = 'INSERT INTO auto (VIN, Marka, Model, Godiste, Registracija, Vlasnik_ID) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Vin, Marka, Model, Godiste, Registracija, Vlasnik_ID], (err, result) => {
      if (err) {
        console.error('Greška pri unosu auta:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      res.json(result);
    });
};

exports.getVinByVlasnik = (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT VIN FROM auto WHERE Vlasnik_ID = ?'
    db.query(sql, [id], (err, result) => {
      if(err) {
        console.error('Greska pri unosu auta:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json(result);
    })
}