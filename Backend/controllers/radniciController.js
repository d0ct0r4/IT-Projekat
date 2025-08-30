const db = require('../db');

exports.getAllRadnici = (req, res) => {
    db.query("SELECT * FROM radnici", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getSatnica = (req, res) => {
    const radnik_JMBG = req.params.jmbg;

    const sqlElektricar = 'SELECT satnica FROM elektricar WHERE JMBG_Radnik = ?';
    const sqlAutomehanicar = 'SELECT satnica FROM automehanicar WHERE JMBG_Radnik = ?';
  
    db.query(sqlElektricar, [radnik_JMBG], (err, result1) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      if (result1.length > 0) {
        return res.json(result1[0].satnica);
      } else {
        db.query(sqlAutomehanicar, [radnik_JMBG], (err2, result2) => {
          if (err2) return res.status(500).json({ error: 'Database error' });
  
          if (result2.length > 0) {
            return res.json(result2[0].satnica );
          } else {
            return res.status(404).json({ error: 'Radnik nije pronadjen u ni jednoj tabeli' });
          }
        });
      }
    })
}

// 1. Dohvati sve automehaničare
exports.getAutomehanicari = (req, res) => {
  const sql = `
    SELECT r.JMBG, r.Ime, r.Prezime, DATE_FORMAT(r.Datum_Rodjenja, '%y-%m-%d') AS Datum_Rodjenja, r.Broj_Telefona, a.Godine_Iskustva, a.Satnica
    FROM radnici r
    JOIN automehanicar a ON r.JMBG = a.JMBG_Radnik
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Greška getAutomehanicari:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

// 2. Dohvati sve električare
exports.getElektricari = (req, res) => {
  const sql = `
    SELECT r.JMBG, r.Ime, r.Prezime, DATE_FORMAT(r.Datum_Rodjenja, '%y-%m-%d') AS Datum_Rodjenja, r.Broj_Telefona, e.Godine_Iskustva, e.Satnica
    FROM radnici r
    JOIN elektricar e ON r.JMBG = e.JMBG_Radnik
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Greška getElektricari:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

// 3. Dodaj radnika
exports.createRadnik = (req, res) => {
  const { JMBG, Ime, Prezime, Datum_Rodjenja, Broj_Telefona, tip, Godine_Iskustva, Satnica } = req.body;

  const insertRadnik = `
    INSERT INTO radnici (JMBG, Ime, Prezime, Datum_Rodjenja, Broj_Telefona) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(insertRadnik, [JMBG, Ime, Prezime, Datum_Rodjenja, Broj_Telefona], (err) => {
    if (err) {
      console.error("Greška pri unosu radnika:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const insertSpecijalizacija =
      tip === "automehanicar"
        ? "INSERT INTO automehanicar (JMBG_Radnik, Godine_Iskustva, Satnica) VALUES (?, ?, ?)"
        : "INSERT INTO elektricar (JMBG_Radnik, Godine_Iskustva, Satnica) VALUES (?, ?, ?)";

    db.query(insertSpecijalizacija, [JMBG, Godine_Iskustva, Satnica], (err2) => {
      if (err2) {
        console.error("Greška pri unosu specijalizacije:", err2);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Radnik uspješno dodat" });
    });
  });
};

// 4. Brisanje radnika (otkaz)
exports.deleteRadnik = (req, res) => {
  const { jmbg } = req.params;

  // Brišemo prvo iz automehaničar/električar
  const sqlDeleteAuto = "DELETE FROM automehanicar WHERE JMBG_Radnik = ?";
  const sqlDeleteEl = "DELETE FROM elektricar WHERE JMBG_Radnik = ?";
  const sqlDeleteUser = "DELETE FROM users WHERE radnik_jmbg = ?";
  const sqlDeleteRadnik = "DELETE FROM radnici WHERE JMBG = ?";

  db.query(sqlDeleteAuto, [jmbg], () => {
    db.query(sqlDeleteEl, [jmbg], () => {
      db.query(sqlDeleteUser, [jmbg], () => {
        db.query(sqlDeleteRadnik, [jmbg], (err) => {
          if (err) {
            console.error("Greška pri brisanju radnika:", err);
            return res.status(500).json({ error: "Database error" });
          }
          res.json({ message: "Radnik obrisan i iz auth tabele" });
        });
      });
    });
  });
};

// 5. Update satnice i godina iskustva
exports.updateRadnik = (req, res) => {
  const { jmbg } = req.params;
  const { Godine_Iskustva, Satnica, tip } = req.body;

  const sql =
    tip === "automehanicar"
      ? "UPDATE automehanicar SET Godine_Iskustva = ?, Satnica = ? WHERE JMBG_Radnik = ?"
      : "UPDATE elektricar SET Godine_Iskustva = ?, Satnica = ? WHERE JMBG_Radnik = ?";

  db.query(sql, [Godine_Iskustva, Satnica, jmbg], (err) => {
    if (err) {
      console.error("Greška pri ažuriranju radnika:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Radnik uspješno ažuriran" });
  });
};

// controllers/radniciController.js
exports.updateRadnik = (req, res) => {
  const { jmbg } = req.params;
  const { Godine_Iskustva, Satnica } = req.body;

  const sql = "UPDATE radnici SET Godine_Iskustva=?, Satnica=? WHERE JMBG=?";
  db.query(sql, [Godine_Iskustva, Satnica, jmbg], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Radnik ažuriran" });
  });
};
