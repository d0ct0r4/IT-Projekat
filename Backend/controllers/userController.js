const db = require('../db');

exports.getAllUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

