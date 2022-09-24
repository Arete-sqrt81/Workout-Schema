const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM workoutschema";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const exercise = req.body.exercise;
  const musclegroup = req.body.musclegroup;
  // const setsnumber = req.body.setsnumber;
  const reps = req.body.repetitions;

  const sqlInsert =
    "INSERT INTO workoutschema (exercise, musclegroup, reps) VALUES (?,?,?)";
  db.query(sqlInsert, [exercise, musclegroup, reps], (err, result) => {
    console.log(err);
  });
});

app.delete("/api/delete/:exercise", (req, res) => {
  const name = req.params.exercise;
  const sqlDelete = "DELETE FROM workoutschema WHERE exercise = ?";
  db.query(sqlDelete, name, (err, results) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.exercise;
  const musclegroup = req.body.musclegroup;
  const sqlUpdate =
    "UPDATE workoutschema SET musclegroup = ? WHERE exercise = ?";
  db.query(sqlUpdate, [musclegroup, name], (err, results) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
