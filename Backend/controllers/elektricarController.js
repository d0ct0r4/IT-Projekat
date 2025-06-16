const db = require('../db');

exports.getAllElektricar = (req, res) => {
    db.query("SELECT r.*, e.Godine_Iskustva, e.Satnica FROM radnici JOIN elektricar e on r.JMBG = e.JMBG_radnik", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

