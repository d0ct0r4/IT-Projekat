const db = require('../db');
const { use } = require('../routes/auto');

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password_hash = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    res.json({
      message: 'Login successful',
      user: {
        id: user.ID,
        username: user.username,
        role: user.role,
        linked_id: user.linked_id,
        radnik_jmbg: user.radnik_jmbg
      }
    });
  });
};

const registerUser = (req, res) => {
  const { username, password, ime, prezime, brojTelefona } = req.body;

  const role = "client";

  const checkSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkSql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const insertMusterija = 'INSERT INTO musterija (Ime, Prezime, Broj_Telefona) VALUES (?, ?, ?)';
    db.query(insertMusterija, [ime, prezime, brojTelefona], (err, resultMusterija) => {
      if (err) return res.status(500).json({ error: err });

      const musterijaId = resultMusterija.insertId;

      const insertUser = 'INSERT INTO users (username, password_hash, role, linked_id) VALUES (?, ?, ?, ?)';
      db.query(insertUser, [username, password, role, musterijaId], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        return res.json({ message: 'User registered successfully' });
      });
    });
  });
};


module.exports = { loginUser, registerUser };
