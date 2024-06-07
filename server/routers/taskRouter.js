import express from "express";
import { db } from "../db.js";

const taskRouter = express.Router();

// ========================= HomeView에서 읽기 (시작) =========================

taskRouter.get("/:category", async (req, res) => {
  const { userNo } = req.query;
  const { category } = req.params;
  let tableName = "";
  switch (category) {
    case "habit":
      tableName = "habit";
      break;
    case "daily":
      tableName = "daily";
      break;
    case "todo":
      tableName = "todo";
      break;
    default:
      res.status(400).json({ message: "Invalid category" });
      return;
  }
  const query = `SELECT * FROM ${tableName} WHERE userNo = ?`;
  db.query(query, [userNo], (err, results) => {
    if (err) {
      console.error(`Error fetching ${tableName}:`, err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// ========================= HomeView에서 읽기 (끝) =========================
// ========================= 습관 (시작) =========================

taskRouter.put("/habit/increaseCountP", async (req, res) => {
  const { no, userNo } = req.body;
  const query =
    "UPDATE habit SET CountP = CountP + 1 WHERE no = ? AND userNo = ?";
  db.query(query, [no, userNo], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
    } else {
      res.send("CountP updated successfully");
    }
  });
});

taskRouter.put("/habit/increaseCountN", async (req, res) => {
  const { no, userNo } = req.body;
  const query =
    "UPDATE habit SET CountN = CountN + 1 WHERE no = ? AND userNo = ?";
  db.query(query, [no, userNo], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
    } else {
      res.send("CountN updated successfully");
    }
  });
});

taskRouter.post("/habit/create", async (req, res) => {
  const {
    title,
    content,
    positive,
    negative,
    resetCounter,
    difficulty,
    tag,
    userNo,
  } = req.body;
  const query =
    "INSERT INTO habit (title, content, positive, negative, resetCounter, difficulty, tag, userNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [title, content, positive, negative, resetCounter, difficulty, tag, userNo],
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

taskRouter.put("/habit/update/:no", async (req, res) => {
  const { no } = req.params;
  const {
    title,
    content,
    positive,
    negative,
    resetCounter,
    difficulty,
    tag,
    userNo,
  } = req.body;
  const query =
    "UPDATE habit SET title = ?, content = ?, positive = ?, negative = ?, resetCounter = ?, difficulty = ?, tag = ? WHERE no = ? AND userNo = ?";
  db.query(
    query,
    [
      title,
      content,
      positive,
      negative,
      resetCounter,
      difficulty,
      tag,
      no,
      userNo,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating habit:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json({ message: "Habit updated successfully" });
      }
    }
  );
});

taskRouter.delete("/habit/delete/:no", async (req, res) => {
  const { no, userNo } = req.params;
  const query = "DELETE FROM habit WHERE no = ? AND userNo = ?";
  db.query(query, [no, userNo], (err, results) => {
    if (err) {
      console.error("Error deleting habit:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Habit deleted successfully" });
    }
  });
});

// ========================= 습관 (끝) =========================
// ========================= 일일과제 (시작) =========================

taskRouter.put("/daily/checked", async (req, res) => {
  const { no, userNo } = req.body;
  const today = new Date().toISOString().slice(0, 10);
  const query =
    "UPDATE daily SET checked = checked + 1, lastChecked = ? WHERE no = ? AND userNo = ?";
  db.query(query, [today, no, userNo], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
    } else {
      if (results.affectedRows > 0) {
        res.status(200).send("Update successful");
      } else {
        res.status(404).send("No rows updated");
      }
    }
  });
});

taskRouter.post("/daily/create", async (req, res) => {
  const { title, content, difficulty, userNo } = req.body;
  const query =
    "INSERT INTO daily (title, content, difficulty, userNo) VALUES (?, ?, ?, ?)";
  db.query(query, [title, content, difficulty, userNo], (err, results) => {
    if (err) {
      console.error("Error inserting daily:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Daily added successfully" });
    }
  });
});

taskRouter.delete("/daily/delete/:no/:userNo", async (req, res) => {
  const { no, userNo } = req.params;
  const query = "DELETE FROM daily WHERE no = ? AND userNo = ?";
  db.query(query, [no, userNo], (err, results) => {
    if (err) {
      console.error("Error deleting daily:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Daily deleted successfully" });
    }
  });
});

// ========================= 일일과제 (끝) =========================
// ========================= 할일 (시작) =========================

taskRouter.post("/todo/create", async (req, res) => {
  const { title, content, difficulty, userNo } = req.body;
  const query =
    "INSERT INTO todo (title, content, difficulty, userNo) VALUES (?, ?, ?, ?)";
  db.query(query, [title, content, difficulty, userNo], (err, results) => {
    if (err) {
      console.error("Error inserting todo:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Todo added successfully" });
    }
  });
});

taskRouter.put("/todo/update/:no", async (req, res) => {
  const { title, content, difficulty, no, userNo } = req.body;
  const query =
    "UPDATE todo SET title = ?, content = ?, difficulty = ? WHERE no = ? AND userNo = ?";
  db.query(query, [title, content, difficulty, no, userNo], (err, results) => {
    if (err) {
      console.error("Error updating todo:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Todo updated successfully" });
    }
  });
});

taskRouter.delete("/todo/delete/:no", async (req, res) => {
  const { no, userNo } = req.query;
  const query = "DELETE FROM todo WHERE no = ? AND userNo = ?";
  db.query(query, [no, userNo], (err, results) => {
    if (err) {
      console.error("Error deleting todo:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Todo deleted successfully" });
    }
  });
});

// ========================= 할일 (끝) =========================

export default taskRouter;
