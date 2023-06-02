const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

connection.connect((err) => {
  if (err) {
    console.error('Failed to establish the Connection :(');
  }
  else {
    console.log("Sucessfully establish the connction :)");
  }
})

connection.end((err => {
  if (err) {
    res.send('We are failed to connecting the DB :(');
  }
  else {
    if (err) {
      res.send('We have made Sucessfully connecting to the DB :)');
    }
  }
}))







// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// POST route for form submission
app.post('/login', (req, res) => {
  // Retrieve form data from the request body
  const { username, password } = req.body;

  // Perform basic validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  // Do something with the form data (e.g., validate credentials, authenticate user)
  // Auntication some pagination some more advance sorting and some user validation or something..
  // ...

  // Return a success response
  res.json({ message: 'Login successful!' });
});









app.get('/', (req, res) => {
  res.send("<h1>Welcome to Bagh's Land</h1>")
})

app.get('/users', (req, res) => {
  res.send('This is a response in the user page!!')
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server is listing!!!");
})