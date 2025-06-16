const db = require('../db');

exports.getAllNabavka = (req, res) => {
    db.query("SELECT * FROM nabavka", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

