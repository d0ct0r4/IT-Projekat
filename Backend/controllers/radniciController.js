const db = require('../db');

exports.getAllRadnici = (req, res) => {
    db.query("SELECT * FROM radnici", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

