const db = require('../db');

exports.getAllAuto = (req, res) => {
    db.query("SELECT * FROM auto", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getCarsByClient = (req, res) => {
  const clientId = req.params.id;

  console.log(clientId);

  const sql = 'SELECT * FROM auto WHERE Vlasnik_ID = ?';
  db.query(sql, [clientId], (err, results) => {
    if (err) {
      console.error('Greška pri upitu:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
};
