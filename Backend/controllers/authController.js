const db = require('../db');
const { link, use } = require('../routes/auto');

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
        linked_id: user.linked_id
      }
    });
  });
};

const registerUser = (req, res) => {
    const { username, password, role } = req.body;
  
    const checkSql = 'SELECT * FROM users WHERE username = ?';
    db.query(checkSql, [username], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const insertSql = 'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)';
      db.query(insertSql, [username, password, role], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ message: 'User registered successfully' });
      });
    });
  };
  

module.exports = { loginUser, registerUser };
