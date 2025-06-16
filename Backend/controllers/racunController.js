const db = require('../db');

exports.getAllRacun = (req, res) => {
    db.query("SELECT * FROM racun", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

