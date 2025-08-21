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
  
  exports.printRacun = async (req, res) => {
    const { musterija_id, popravka_id, datum, sati, zahtjev_id, dijelovi, radnik_jmbg } = req.body;
    const slika = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      // 1. Update popravke
      await new Promise((resolve, reject) => {
        const sql = "UPDATE popravka SET Kraj_Datum = ?, slika = ? WHERE ID = ?";
        db.query(sql, [datum, slika, popravka_id], (err) => err ? reject(err) : resolve());
      });
  
      let ukupnoDijelovi = 0;
      let dijeloviSaCijenom = [];
  
      // 2. Dijelovi + ukupna cijena
      for (let d of dijelovi || []) {
        const cijenaDijela = await new Promise((resolve, reject) => {
          db.query("SELECT Cijena FROM dijelovi WHERE ID = ?", [d.dioID], (err, result) => {
            if (err) return reject(err);
            if (!result[0]) return reject(new Error("Dio ne postoji ID: " + d.dioID));
            resolve(result[0].Cijena);
          });
        });
  
        ukupnoDijelovi += cijenaDijela * d.kolicina;
  
        dijeloviSaCijenom.push({
          dioID: d.dioID,
          kolicina: d.kolicina,
          cijena: cijenaDijela
        });
  
        await new Promise((resolve, reject) => {
          db.query("UPDATE dijelovi SET Stanje = Stanje - ? WHERE ID = ?", [d.kolicina, d.dioID], (err) => err ? reject(err) : resolve());
        });
      }
  
      // 3. Satnica radnika
      const satnicaRadnika = await new Promise((resolve, reject) => {
        const sql = `
          SELECT Satnica FROM automehanicar WHERE JMBG_Radnik = ?
          UNION
          SELECT Satnica FROM elektricar WHERE JMBG_Radnik = ?
        `;
        db.query(sql, [radnik_jmbg, radnik_jmbg], (err, result) => {
          if (err) return reject(err);
          if (!result[0]) return resolve(0);
          resolve(result[0].Satnica);
        });
      });
  
      const ukupnoRad = satnicaRadnika * sati;
      const ukupnoCijena = ukupnoDijelovi + ukupnoRad;
  
      // 4. Insert racun
      const racunID = await new Promise((resolve, reject) => {
        const sql = "INSERT INTO racun(Musterija_ID, Popravka_ID, Datum, sati, Cena) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [musterija_id, popravka_id, datum, sati, ukupnoCijena], (err, result) => err ? reject(err) : resolve(result.insertId));
      });
  
      // 5. Ubacivanje dijelova sa cijenom
      for (let d of dijeloviSaCijenom) {
        await new Promise((resolve, reject) => {
          const sql = "INSERT INTO racun_djelovi (RacunID, DioID, Kolicina, Cijena) VALUES (?, ?, ?, ?)";
          const ukupnaCijenaDijela = d.cijena * d.kolicina;
          db.query(sql, [racunID, d.dioID, d.kolicina, ukupnaCijenaDijela], (err) => err ? reject(err) : resolve());
        });
      }
  
      // 6. Update zahtjev
      await new Promise((resolve, reject) => {
        const sql = "UPDATE zahtjevi SET preuzet = 2 WHERE ID = ?";
        db.query(sql, [zahtjev_id], (err) => err ? reject(err) : resolve());
      });
  
      res.json({ message: "Račun uspješno kreiran", racunID, ukupnoCijena });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  