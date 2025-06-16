const db = require('../db');

exports.getAllMusterija = (req, res) => {
    db.query("SELECT * FROM musterija", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

