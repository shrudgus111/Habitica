import express from "express";
import { db } from "../db.js";

const taskRouter = express.Router();
taskRouter.get("/habit", async (req, res) => {
  const query = "SELECT * FROM habit";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching habits:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

taskRouter.put("/habit/increaseCountP", async (req, res) => {
  const { no } = req.body;
  const query = `UPDATE habit SET CountP = CountP + 1 WHERE no=?`;
  db.query(query, [no], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
    } else {
      res.send(" updated successfully");
    }
  });
});

taskRouter.put("/habit/increaseCountN", async (req, res) => {
  const { no } = req.body;
  const query = `UPDATE habit SET CountN = CountN + 1 WHERE no=?`;
  db.query(query, [no], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
    } else {
      res.send("CountN updated successfully");
    }
  });
});

taskRouter.post("/habit/create", async (req, res) => {
  const { title, content, positive, negative, resetCounter, difficulty, tag } =
    req.body;
  const query =
    "INSERT INTO habit (title, content, positive, negative, resetCounter, difficulty, tag) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [title, content, positive, negative, resetCounter, difficulty, tag],
    (err, results) => {
      if (err) {
        console.error("Error inserting habit:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json({ message: "Habit added successfully" });
      }
    }
  );
});

taskRouter.get("/daily", async (req, res) => {
  const query = "SELECT * FROM daily";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching daily:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

taskRouter.get("/todo", async (req, res) => {
  const query = "SELECT * FROM todo";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todo:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

export default taskRouter;
