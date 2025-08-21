const db = require('../db');

exports.getRacuDjeloviByID = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM racun_djelovi WHERE RacunID = ?";
    db.query(sql, id, (err, results) => {
        if (err) {
            console.error('Greška pri upitu:', err);
            return res.status(500).json({ error: 'Database error' });
          }
      
          res.json(results);
    })
}