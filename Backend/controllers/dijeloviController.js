const db = require('../db');

exports.getAllDijelovi = (req, res) => {
    db.query("SELECT * FROM dijelovi", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

