const db = require("../db");

// Svi dijelovi
exports.getDjelovi = (req, res) => {
  db.query("SELECT * FROM dijelovi", (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

// POST dodaj dio
exports.addDio = (req, res) => {
  const { Naziv, Cijena, Stanje } = req.body;

  if (!Naziv || !Cijena || !Stanje) {
    return res.status(400).json({ error: "Sva polja su obavezna" });
  }

  const sql = "INSERT INTO dijelovi (Naziv, Cijena, Stanje) VALUES (?, ?, ?)";
  db.query(sql, [Naziv, Cijena, Stanje], (err, result) => {
    if (err) {
      console.error("Greška pri dodavanju dijela:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Dio uspješno dodat", id: result.insertId });
  });
};

exports.updateDio = (req, res) => {
    const { id } = req.params;
    const { Naziv, Cijena, Stanje } = req.body;
  
    const sql = "UPDATE dijelovi SET Naziv = ?, Cijena = ?, Stanje = ? WHERE ID = ?";
    db.query(sql, [Naziv, Cijena, Stanje, id], (err, result) => {
      if (err) {
        console.error("Greška pri izmjeni dijela:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Dio uspješno izmijenjen" });
    });
  };

  exports.deleteDio = (req, res) => {
    const { id } = req.params;
  
    const sql = "DELETE FROM dijelovi WHERE ID = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Greška pri brisanju dijela:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Dio uspješno obrisan" });
    });
  };

  exports.pretraziDijelove = (req, res) => {
  const { q } = req.query; // npr. /dijelovi/search?q=ulje
  const sql = "SELECT * FROM dijelovi WHERE Naziv LIKE ?";

  db.query(sql, [`%${q}%`], (err, results) => {
    if (err) {
      console.error("Greška u pretrazi:", err);
      return res.status(500).json({ error: "Greška servera" });
    }
    res.json(results);
  });
};