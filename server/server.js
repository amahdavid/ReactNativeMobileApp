const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const app = express();
const port = 3000;
const secretKey = crypto.randomBytes(64).toString("hex");

app.use(bodyParser.json());

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "10s" });
};

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ReactMobileAppProject",
});

app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Please fill all the fields");
  }

  if (!validateEmail(email)) {
    return res.status(400).send("Invalid email address");
  }

  if (!validatePassword(password)) {
    return res
      .status(400)
      .send(
        "Password must contain at least 8 characters, including letters and numbers"
      );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailExistsQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(emailExistsQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking duplicate email:", err);
      return res.status(500).send("Server error");
    }
    if (result.length > 0) {
      return res.status(400).send("Email address already registered");
    }

    const insertUserQuery = `INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(
      insertUserQuery,
      [firstName, lastName, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error inserting new user:", err);
          return res.status(500).send("Server error");
        }
        res.status(201).send("User created successfully");
      }
    );
  });
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please fill all the fields");
  }

  const getUserQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(getUserQuery, [email], async (err, result) => {
    if (err) {
      console.error("Error checking email existence:", err);
      return res.status(500).send("Server error");
    }
    if (result.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const token = generateToken(user.id);
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token");
      }
    });
    res.status(200).json({ token });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
