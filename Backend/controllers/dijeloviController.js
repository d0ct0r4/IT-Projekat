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
