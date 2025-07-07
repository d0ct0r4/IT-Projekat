const db = require('../db');

exports.getAllRadnici = (req, res) => {
    db.query("SELECT * FROM radnici", (err, data) =>{
        if(err) return err;
        res.json(data);
    });
};

exports.getSatnica = (req, res) => {
    const radnik_JMBG = req.params.jmbg;

    const sqlElektricar = 'SELECT satnica FROM elektricar WHERE JMBG_Radnik = ?';
    const sqlAutomehanicar = 'SELECT satnica FROM automehanicar WHERE JMBG_Radnik = ?';
  
    db.query(sqlElektricar, [radnik_JMBG], (err, result1) => {
      if (err) return res.status(500).json({ error: 'Database error' });

      if (result1.length > 0) {
        return res.json(result1[0].satnica);
      } else {
        db.query(sqlAutomehanicar, [radnik_JMBG], (err2, result2) => {
          if (err2) return res.status(500).json({ error: 'Database error' });
  
          if (result2.length > 0) {
            return res.json(result2[0].satnica );
          } else {
            return res.status(404).json({ error: 'Radnik nije pronadjen u ni jednoj tabeli' });
          }
        });
      }
    })
}