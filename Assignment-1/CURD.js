const express = require('express');
const mysql = require("mysql");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { status } = require('express/lib/response');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

// CREATING CONNECTION TO MYSQL;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'users'
})


connection.connect((err) => {
  if (err) {
    new Error(`The DB is not connected :-(`)
  }
  console.log(`DB is connected :-)`);
})

// User Registration 

// C - CREATE USER..
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // hasing the password..
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(`Something went wrong.`);

      res.status(500).json({
        message: 'Something went wrong  in hashing the password '
      })
      return;
    }

    const sql = `INSERT into users (username,password,email) VALUES(?,?,?)`

    connection.query(sql, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error(`Something went wrong :-( in DB`, err);
        res.status(500).json({
          message: 'Somehting went wrong in DB'
        })
        return;
      }
      res.status(201).json({
        message: 'Creating user is successful :-)'
      })
    })
  })
})

// R- Read exicution.
app.get('/data', (req, res) => {
  const sqlQuery = `select * from users`;

  connection.query(sqlQuery, (err, rows) => {
    if (err) {
      console.error(`Error getting connection..`, err);
      res.send(500).json({
        status: 'Failed',
        message: 'Internal Server Error'
      })
      return;
    }
    console.log(`Data retriving sucessful`, rows);
    res.status(201).json({
      status: `Sucessful`,
      message: `Data retriving sucessful`,
      data: rows
    })
  })
})


// U - Update.
app.put('/data/:id', (req, res) => {
  const id = req.params.id;
  const { username, password, email } = req.body;

  // Hash the new password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(`Something went wrong.`);
      res.status(500).json({
        message: 'Something went wrong in hashing the password'
      });
      return;
    }

    const sql = `UPDATE users SET username=?, password=?, email=? WHERE id=?`;
    const values = [username, hashedPassword, email, id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(`Something went wrong :-( in DB`, err);
        res.status(500).json({
          message: 'Something went wrong in DB'
        });
        return;
      }
      res.status(200).json({
        message: 'Data updated successfully'
      });
    });
  });
});



app.get('/', (req, res) => {
  res.send('<h1> This server is on! </h1>');
})

const PORT = 8000;
// This is the server.
app.listen(PORT, () => {
  console.log(`Server is listing :-)`);
})
