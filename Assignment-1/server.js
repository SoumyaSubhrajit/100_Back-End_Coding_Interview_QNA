const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

// CONNECTION TO THE MYSQL DB..
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: "users",
})

connection.connect((err) => {
  if (err) {
    console.error(`The MySQL coonection if failed!`);
  }
  console.log(`connected to MySQL DB:)`);
})


connection.end((err) => {
  if (err) {
    console.error(`Error closing MySQL connection: `, err);
  }
  console.log(`sucessfully closed the connection:)`);
})

const app = express();

app.get('/user', (req, res) => {
  res.send("<h1>Hello kanha<h1>")
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log("The port is listing!!");
})