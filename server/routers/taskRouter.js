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
