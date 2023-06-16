const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const bcrypt = require('bcrypt');
const bodyPareser = require('body-parser');


const app = express();
app.use(bodyPareser.json());

const connction = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'users'
})

connction.connect(err => {
  if (err) {
    new Error(`DB conncetion has failed :-(`)
  }
  console.log(`DB connection has made sucessfully :-)`);
})

const handleRequest = (req, res) => {
  connction.end((err => {
    if (err) {
      res.send(`Something worng in conncetion :-(`)
    }
    res.send(`Enjoy yourself :-)`);
  }))
}

// User registration: 
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  // Hash the password..
  bcrypt.hash(password, 10, (err, hashPassword) => {
    if (err) {
      console.error(`Error occure hasing the password!`, err);
      res.status(500).json({
        messgae: "Internal server error :-("
      })
      return;
    }
    const sql = `INSERT INTO users (username, password,email) VALUES (?,?,?)`
    connction.query(sql, [username, hashPassword, email], (err, result) => {
      if (err) {
        console.error(`Error occure in creating the user :-(`, err);
        res.status(500).json({
          messgae: "Internal server error :-("
        })

      }
      res.status(201).json({
        messgae: `User create sucessfully :-)`
      })
    })
  })
})

app.get('/', (req, res) => {
  res.send("<h2>This the home page</h2>")
})

PORT = 8000;
app.listen(PORT, () => {
  console.log("Am Listing Master Kanha :-)");
})

