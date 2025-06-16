const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'ITProjekatDB'
});

db.connect(err => {
  if (err) throw err;
  console.log("Povezan MySQL");
});

module.exports = db;
