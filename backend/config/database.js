const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "ceedotech",
  password: "ifeco619419",
  database: "php_dev",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database ❌", err.message);
    return;
  }
  console.log("Connected to MySQL database ✅");
});

module.exports = db;
