const db = require('../db');

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
        return res.json({ message: 'Client registered successfully' });
      });
    });
  });
};

const registerStaff = (req, res) => {
  const { username, password, ime, prezime, role, jmbg } = req.body;

  if (!['radnik', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Role must be either radnik or admin' });
  }

  const checkSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkSql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const insertUser = 'INSERT INTO users (username, password_hash, role, radnik_jmbg) VALUES (?, ?, ?, ?)';
    db.query(insertUser, [username, password, role, jmbg], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      return res.json({ message: `User with role ${role} registered successfully` });
    });
  });
};

const getAllUsers = (req, res) => {
  const sql = 'SELECT ID, username, role, linked_id, radnik_jmbg FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID korisnika je obavezan' });
  }

  const sql = 'DELETE FROM users WHERE ID = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Greška pri brisanju korisnika:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Korisnik nije pronađen' });
    }

    res.json({ message: 'Korisnik uspješno obrisan' });
  });
};

module.exports = { deleteUser };

module.exports = { 
  loginUser, 
  registerUser, 
  registerStaff, 
  getAllUsers,
  deleteUser
};
