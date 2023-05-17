const express = require('express');
const mysql = require('mysql');


const app = express();

app.get('/user', (req, res) => {
  res.send("<h1>Hello kanha<h1>")
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log("The port is listing!!");
})