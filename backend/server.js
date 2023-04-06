import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";

const app = express();
const PORT = 5004;

const connection = mysql.createConnection({
  host: "localhost",
  user: "testare",
  password: "testare",
  database: "chasbank",
  port: 8889,
});

app.use(bodyParser.json());

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
  const { username, password, email, amount } = user;

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
          "INSERT INTO accounts (user_id, amount) VALUES (?, ?)",
          [userId, amount],
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

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB connected");

    app.listen(PORT, () => {
      console.log("Server started on port: " + PORT);
    });
  }
});
