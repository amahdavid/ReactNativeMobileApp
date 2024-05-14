const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const uuid = require("uuid");

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
  return jwt.sign({ userId }, secretKey, { expiresIn: "1hr" });
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
  const userId = uuid.v4();

  const emailExistsQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(emailExistsQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking duplicate email:", err);
      return res.status(500).send("Server error");
    }
    if (result.length > 0) {
      return res.status(400).send("Email address already registered");
    }

    const insertUserQuery = `INSERT INTO users (id, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      insertUserQuery,
      [userId, firstName, lastName, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error inserting new user:", err);
          return res.status(500).send("Server error");
        }
        const response = {
          id: userId,
          firstName,
          lastName,
          email,
        };

        res.status(201).json({ response });
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
    const response = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    res.status(200).json({ token, response });
  });
});

app.post("/api/create-post/:userId", (req, res) => {
  const { title, thumbnail_url, description, video_url } = req.body;
  const userId = req.params.userId;

  if (!title || !thumbnail_url || !description || !video_url) {
    return res.status(400).json({
      error:
        "Title, thumbnail_url, description, and video_url are required fields",
    });
  }

  const checkDuplicateQuery = `SELECT * FROM posts WHERE user_id = ? AND video_url = ?`;
  connection.query(checkDuplicateQuery, [userId, video_url], (err, results) => {
    if (err) {
      console.error("Error checking for duplicate video URL:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Video already posted by the user" });
    }

    const postId = uuid.v4();
    const createPostQuery = `INSERT INTO posts (id, user_id, title, thumbnail_url, description, video_url) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(
      createPostQuery,
      [postId, userId, title, thumbnail_url, description, video_url],
      (err, result) => {
        if (err) {
          console.error("Error creating new post:", err);
          return res.status(500).json({ error: "Server error" });
        }
        const post = {
          id: postId,
          user_id: userId,
          title,
          thumbnail_url,
          description,
          video_url,
        };
        res.status(201).json({ message: "Post created successfully", post });
      }
    );
  });
});

app.post("/api/validate-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    const userId = decoded.userId;
    const getUserQuery = `SELECT * FROM users WHERE id = ?`;
    connection.query(getUserQuery, [userId], (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).send("User not found");
      }
      res.status(200).send("Token is valid");
    });
  });
});

app.get("/api/:userId/posts", (req, res) => {
  const userId = req.params.userId;
  const getPostQuery = `SELECT * FROM posts WHERE user_id = ?`;
  connection.query(getPostQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).json({ posts: results });
  });
});

app.get("/api/:userId/post/:postId", (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  const getPostQuery = `SELECT * FROM posts WHERE user_id = ? AND id = ?`;
  connection.query(getPostQuery, [userId, postId], (err, results) => {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post: results[0] });
  });
});

app.get("/api/posts", (req, res) => {
    const getAllPostsQuery = `SELECT * FROM posts`;
    connection.query(getAllPostsQuery, (err, results) => {
      if (err) {
        console.error("Error fetching posts:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.status(200).json({ posts: results });
    });
  });  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
