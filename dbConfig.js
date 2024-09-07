const mysql2 = require("mysql2");

// Creating a connection to the database
const db = mysql2.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin123",
  database: "employeedb",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

module.exports = db;
