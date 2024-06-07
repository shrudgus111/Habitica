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
  let expIncreaseAmount;
  let coinIncreaseAmount;
  switch (difficulty) {
    case "trivial":
      expIncreaseAmount = 1;
      coinIncreaseAmount = 1;
      break;
    case "easy":
      expIncreaseAmount = 2;
      coinIncreaseAmount = 2;
      break;
    case "medium":
      expIncreaseAmount = 3;
      coinIncreaseAmount = 3;
      break;
    case "hard":
      expIncreaseAmount = 4;
      coinIncreaseAmount = 4;
      break;
    default:
      expIncreaseAmount = 1;
      coinIncreaseAmount = 1;
      break;
  }

  // 경험치 증가 및 레벨업 로직
  const query = `
        UPDATE avatar 
        SET currentExp = currentExp + ?, 
            coin = coin + ?, 
            level = CASE 
                      WHEN currentExp + ? >= expThreshold THEN level + 1
                      ELSE level
                    END,
            health = CASE
                            WHEN currentExp + ? >= expThreshold THEN baseHealth + (level + 1) * 5
                            ELSE health
                          END,
            currentHealth = CASE
                                WHEN currentExp + ? >= expThreshold THEN baseHealth + (level + 1) * 5
                                ELSE currentHealth
                              END,
            currentExp = CASE
                           WHEN currentExp + ? >= expThreshold THEN currentExp + ? - expThreshold
                           ELSE currentExp + ?
                         END
        WHERE userNo=?
      `;

  db.query(
    query,
    [
      expIncreaseAmount,
      coinIncreaseAmount,
      expIncreaseAmount,
      expIncreaseAmount,
      expIncreaseAmount,
      expIncreaseAmount,
      expIncreaseAmount,
      expIncreaseAmount,
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
