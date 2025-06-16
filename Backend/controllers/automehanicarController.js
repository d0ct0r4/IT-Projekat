const db = require('../db');

exports.getAllAutomehanicar = (req, res) => {
    db.query("SELECT r.*, a.Godine_Iskustva ,a.Satnica FROM radnici JOIN automehanicar a on r.JMBG = e.JMBG_radnik", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

