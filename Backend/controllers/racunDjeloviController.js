const db = require('../db');

exports.getRacuDjeloviByID = (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT 
            rd.RacunID,
            d.Naziv AS DioNaziv,
            rd.Kolicina,
            rd.Cijena
        FROM racun_djelovi rd
        JOIN dijelovi d ON rd.DioID = d.ID
        WHERE rd.RacunID = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Greška pri upitu:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
};
