const db = require("../db");

// Dohvati sve dostave
exports.getDostave = (req, res) => {
  const sql = `
    SELECT r.ID, r.Cena, DATE_FORMAT(r.Datum, '%y-%m-%d') AS Datum
    FROM nabavka r
    ORDER BY r.Datum DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Dohvati stavke za određenu dostavu
exports.getDostavaStavke = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT nd.DioID, d.Naziv, nd.Kolicina, nd.Cena
    FROM nabavka_dijelovi nd
    JOIN dijelovi d ON nd.DioID = d.ID
    WHERE nd.NabavkaID = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Dodaj novu dostavu sa više djelova
exports.addDostava = (req, res) => {
    const { Datum, dijelovi } = req.body;
  
    // ukupna cijena = suma stavki
    const ukupno = dijelovi.reduce((sum, s) => sum + (s.Cena * s.Kolicina), 0);
  
    // 1. Ubaci u racun
    const sqlInsert = "INSERT INTO nabavka (Cena, Datum) VALUES (?, ?)";
    db.query(sqlInsert, [ukupno, Datum], (err, result) => {
      if (err) return res.status(500).json({ error: err });
  
      const racunID = result.insertId;
  
      // 2. Ubaci stavke
      const stavkeSql = "INSERT INTO nabavka_dijelovi (NabavkaID, DioID, Kolicina, Cena) VALUES ?";
      const values = dijelovi.map(s => [racunID, s.DioID, s.Kolicina, s.Cena]);
  
      db.query(stavkeSql, [values], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
  
        // 3. Update stanje u dijelovi tabeli
        dijelovi.forEach(s => {
          db.query(
            "UPDATE dijelovi SET Stanje = Stanje + ? WHERE ID = ?",
            [s.Kolicina, s.DioID],
            (err3) => {
              if (err3) console.error("Greška pri update stanja:", err3);
            }
          );
        });
  
        res.json({ message: "Dostava uspješno dodana!" });
      });
    });
  };
  