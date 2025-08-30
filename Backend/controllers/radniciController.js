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
  const { Godine_Iskustva, Satnica } = req.body;

  const sql1 = `SELECT * FROM automehanicar WHERE JMBG_Radnik = ?`;
  const sql2 = `SELECT * FROM elektricar WHERE JMBG_Radnik = ?`;

  // prvo provjeri da li je automehaničar
  db.query(sql1, [jmbg], (err1, result1) => {
    if (err1) {
      console.error("Greška pri provjeri automehaničara:", err1);
      return res.status(500).json({ error: "Database error kod provjere automehaničara" });
    }

    if (result1.length > 0) {
      // našli smo ga u automehaničar tabeli
      const updateSql = `UPDATE automehanicar SET Godine_Iskustva = ?, Satnica = ? WHERE JMBG_Radnik = ?`;
      db.query(updateSql, [Godine_Iskustva, Satnica, jmbg], (errUpdate) => {
        if (errUpdate) {
          console.error("Greška pri update-u automehaničara:", errUpdate);
          return res.status(500).json({ error: "Database error kod update-a automehaničara" });
        }
        return res.json({ message: "Automehaničar uspješno ažuriran" });
      });
    } else {
      // ako nije u automehaničar, probaj električar
      db.query(sql2, [jmbg], (err2, result2) => {
        if (err2) {
          console.error("Greška pri provjeri električara:", err2);
          return res.status(500).json({ error: "Database error kod provjere električara" });
        }

        if (result2.length > 0) {
          const updateSql = `UPDATE elektricar SET Godine_Iskustva = ?, Satnica = ? WHERE JMBG_Radnik = ?`;
          db.query(updateSql, [Godine_Iskustva, Satnica, jmbg], (errUpdate) => {
            if (errUpdate) {
              console.error("Greška pri update-u električara:", errUpdate);
              return res.status(500).json({ error: "Database error kod update-a električara" });
            }
            return res.json({ message: "Električar uspješno ažuriran" });
          });
        } else {
          // nije pronađen ni u jednoj tabeli
          return res.status(404).json({ error: "Radnik nije pronađen" });
        }
      });
    }
  });
};
