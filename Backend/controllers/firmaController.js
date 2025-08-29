const db = require('../db');

exports.getAllFirma = (req, res) => {
    db.query("SELECT * FROM firma", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

