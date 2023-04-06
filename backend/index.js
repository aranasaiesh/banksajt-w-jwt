import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import mysql from "mysql";
import cors from "cors";

// console.log(require("crypto").randomBytes(64).toString("hex"));

const secret = "sommar";

const app = express();
const PORT = 5004;
const accounts = [];
app.use(bodyParser.json());
app.use(cors());

function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token from auth header", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    console.log("my id:", userId);

    req.userId = userId;

    next();
  });
}

const connection = mysql.createConnection({
  host: "localhost",
  user: "testare",
  password: "testare",
  database: "chasbank",
  port: 8889,
});

app.get("/", (req, res) => {
  const id = 1;

  connection.query(
    "SELECT * FROM users1 WHERE id = ?",
    [id],
    (err, results) => {
      console.log(results);
      console.log(err);

      res.send(results[0].username);
    }
  );
});

app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  const { username, password, email } = user;

  connection.query(
    "INSERT INTO users1 (username, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (err, results) => {
      console.log("results", results);
      console.log("user error", err);

      if (err) {
        res.sendStatus(500);
      } else {
        const userId = results.insertId;

        connection.query(
          "INSERT INTO accounts (user_id) VALUES (?)",
          [userId],

          (err, results) => {
            console.log("account error", err);
            if (err) {
              res.sendStatus(500);
            } else {
              res.send("ok");
            }
          }
        );
      }
    }
  );
});

// 1. Skapa token från user. Skicka token till användare.
// 2. Användaren skickar med sin token i nästa request -> omvandlar token till userobjekt.

app.post("/sessions", (req, res) => {
  const user = req.body;
  const { username, password } = user;

  connection.query(
    "SELECT id, password FROM users1 WHERE username = ?",
    [username],
    (err, results) => {
      const dbUser = results[0];
      console.log("DB USER", dbUser);
      if (dbUser && dbUser.password == password) {
        const token = generateAccessToken(dbUser.id);
        console.log("Success");
        console.log("token here ", token);

        res.json({ token });
      }
    }
  );
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  const user_id = req.userId;
  console.log("user", user_id);

  connection.query(
    "SELECT amount FROM accounts WHERE user_id = ?",
    [user_id],
    (err, results) => {
      const amount = results[0].amount;
      res.json(amount);
      console.log("Error account", err);
      console.log("GOOD", results);
    }
  );
});

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
