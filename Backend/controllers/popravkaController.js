const db = require('../db');

exports.getAllPopravka = (req, res) => {
    db.query("SELECT * FROM popravka", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

