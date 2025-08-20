const db = require('../db');

exports.getAllDijelovi = (req, res) => {
    db.query("SELECT * FROM dijelovi", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getDjeloviByIme = (req, res) => {
    const ime = req.params.ime;

    const sql = `SELECT * FROM djelovi WHERE Naziv = ?`
    db.query(sql, ime, (err, results) => {
        if (err) {
            console.error('Greška pri upitu:', err);
            return res.status(500).json({ error: 'Database error' });
        }
    
        res.json(results);
    })
}