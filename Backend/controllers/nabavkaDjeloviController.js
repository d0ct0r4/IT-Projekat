const db = require('../db');

exports.getNabavkaDjeloviByID = (req, res) => {
    const id = req.paras.id;

    const sql = `SELECT * FROM nabavka_djelovi where NabavkaID = ?`
    db.query(sql, id, (err, results) => {
        if (err) {
            console.error('Greška pri upitu:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    })
}

exports.createNabavka = (req, res) => {
    const { firmaID, radnikID, dijelovi } = req.body;
    // dijelovi = [ { dioID: 1, kolicina: 5 }, { dioID: 2, kolicina: 10 } ]
  
    db.beginTransaction((err) => {
      if (err) return res.status(500).json({ error: 'Greška pri pokretanju transakcije' });
  
      const insertNabavka = "INSERT INTO nabavka (FirmaID, Datum, RadnikID) VALUES (?, CURDATE(), ?)";
      db.query(insertNabavka, [firmaID, radnikID], (err, result) => {
        if (err) {
          return db.rollback(() => {    
            res.status(500).json({ error: 'Greška pri dodavanju nabavke' });
          });
        }
  
        const nabavkaID = result.insertId;
  
        let queries = dijelovi.map((d) => {
          return new Promise((resolve, reject) => {
            const insertStavka = "INSERT INTO nabavka_dijelovi (NabavkaID, DioID, Kolicina) VALUES (?, ?, ?)";
            db.query(insertStavka, [nabavkaID, d.dioID, d.kolicina], (err) => {
              if (err) return reject(err);
  
              const updateDio = "UPDATE dijelovi SET Kolicina = Kolicina + ? WHERE DioID = ?";
              db.query(updateDio, [d.kolicina, d.dioID], (err) => {
                if (err) return reject(err);
                resolve();
              });
            });
          });
        });
  
        Promise.all(queries)
          .then(() => {
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ error: 'Greška pri commit-u' });
                });
              }
              res.json({ message: 'Nabavka uspješno kreirana', nabavkaID });
            });
          })
          .catch((err) => {
            db.rollback(() => {
              console.error('Rollback zbog greške:', err);
              res.status(500).json({ error: 'Greška pri kreiranju stavki' });
            });
          });
      });
    });
  };