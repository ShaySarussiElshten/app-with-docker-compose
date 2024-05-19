const express = require('express');
const mysql = require('mysql2');
const { initDb } = require('./db');

const app = express();
const port = 5000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'database',
  user: 'testuser',
  password: 'admin123',
  // Initially connect without specifying the database
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');

  // Initialize the database and tables
  initDb(connection); // Pass the connection to initDb

  // After initializing the database, you can listen for requests
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
});

app.get('/', (req, res) => {
  connection.query('USE backend;', (err, result) => {
    if (err) throw err;

    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});