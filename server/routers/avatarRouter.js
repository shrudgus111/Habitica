import express from "express";
import { db } from "../db.js";

const avatarRouter = express.Router();

avatarRouter.get("/info", async (req, res) => {
  const { userNo } = req.query;
  const query = "SELECT * FROM avatar WHERE userNo=?";
  db.query(query, [userNo], (err, results) => {
    if (err) {
      console.error("Error fetching avatar:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

avatarRouter.put("/increaseExp", async (req, res) => {
  const { userNo, difficulty } = req.body;

  let expAmount;
  let coinAmount;
  switch (difficulty) {
    case "trivial":
      expAmount = 1;
      coinAmount = 1;
      break;
    case "easy":
      expAmount = 2;
      coinAmount = 2;
      break;
    case "medium":
      expAmount = 3;
      coinAmount = 3;
      break;
    case "hard":
      expAmount = 4;
      coinAmount = 4;
      break;
    default:
      expAmount = 1;
      coinAmount = 1;
      break;
  }

  const query = `
    UPDATE avatar 
    SET currentExp = currentExp + ?, 
        coin = coin + ?, 
        level = CASE 
                  WHEN currentExp + ? >= exp THEN level + 1
                  ELSE level
                END,
        health = CASE
                  WHEN currentExp + ? >= exp THEN health + (level + 1)
                  ELSE health
                END,
        currentHealth = CASE
                          WHEN currentExp + ? >= exp THEN GREATEST(health + (level + 1), currentHealth)
                          ELSE LEAST(currentHealth + ?, health)
                        END,
        currentExp = CASE
                      WHEN currentExp + ? >= exp THEN currentExp + ? - exp
                      ELSE currentExp + ?
                    END
    WHERE userNo=?
  `;

  db.query(
    query,
    [
      expAmount,
      coinAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      userNo,
    ],
    (err, results) => {
      if (err) {
        console.error("Error increasing experience:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json(results);
      }
    }
  );
});

avatarRouter.put("/decreaseExp", async (req, res) => {
  const { userNo, difficulty } = req.body;
  let expAmount;
  let coinAmount;
  switch (difficulty) {
    case "trivial":
      expAmount = -1;
      coinAmount = -1;
      break;
    case "easy":
      expAmount = -2;
      coinAmount = -2;
      break;
    case "medium":
      expAmount = -3;
      coinAmount = -3;
      break;
    case "hard":
      expAmount = -4;
      coinAmount = -4;
      break;
    default:
      expAmount = -1;
      coinAmount = -1;
      break;
  }

  const query = `
    UPDATE avatar 
    SET currentExp = GREATEST(currentExp + ?, 0), 
        coin = coin + ?, 
        level = CASE 
                  WHEN currentExp + ? >= exp THEN level + 1
                  ELSE level
                END,
        health = CASE
                  WHEN currentExp + ? >= exp THEN health + (level + 1)
                  ELSE health
                END,
        currentHealth = CASE
                          WHEN currentExp + ? >= exp THEN LEAST(currentHealth + ?, health + (level + 1))
                          ELSE LEAST(currentHealth + ?, health)
                        END,
        currentExp = CASE
                      WHEN currentExp + ? >= exp THEN currentExp + ? - exp
                      ELSE GREATEST(currentExp + ?, 0)
                    END
    WHERE userNo=?
  `;

  db.query(
    query,
    [
      expAmount,
      coinAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      expAmount,
      userNo,
    ],
    (err, results) => {
      if (err) {
        console.error("Error decreasing experience:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.json(results);
      }
    }
  );
});

avatarRouter.put("/edit", async (req, res) => {
  const { userNo, skin, bodySize, bodyShirt, hairColor, hairBang } = req.body;
  const updateQuery = `
    UPDATE avatar 
    SET skin = ?, 
        bodySize = ?, 
        bodyShirt = ?, 
        hairColor = ?, 
        hairBang = ?
    WHERE userNo = ?
  `;
  const values = [skin, bodySize, bodyShirt, hairColor, hairBang, userNo];

  db.query(updateQuery, values, (err, results) => {
    if (err) {
      console.error("Error updating avatar:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.json({ message: "Avatar updated successfully", results });
    }
  });
});

export default avatarRouter;
