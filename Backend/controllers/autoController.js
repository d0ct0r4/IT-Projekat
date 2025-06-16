const db = require('../db');

exports.getAllAuto = (req, res) => {
    db.query("SELECT * FROM auto", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

