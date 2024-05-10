const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ReactMobileAppProject",
});

app.post("/api/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).send("Please fill all the fields");
    return;
  }

  // more validation can be added here

  const query = `INSERT INTO users (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send("Server error");
      return;
    }
    res.status(201).send("User created successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
