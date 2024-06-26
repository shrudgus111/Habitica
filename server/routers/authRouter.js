import express from "express";
import { db } from "../db.js";
import dayjs from "dayjs";
const authRouter = express.Router();

authRouter.post("/join", (req, res) => {
  const { userId, userPw, userIrum } = req.body.addMember;
  db.query(
    "INSERT INTO membertbl (userId, userPw, userIrum) VALUES (?, ?, ? )",
    [userId, userPw, userIrum],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        const userNo = result.insertId;
        const initialLevel = 1;
        const initialCoin = 10;
        const initialBodySize = 1;
        const initialBodyShirt = 1;
        const initialSkin = 1;
        const initialHairColor = "brown";
        const initialHairBang = 1;
        const initialHealth = 10;
        const initialCurrentHealth = 10;
        const initialExp = 10;
        const initialCurrentExp = 0;

        db.query(
          "INSERT INTO avatar (userNo, level, coin, bodySize, bodyShirt, skin, hairColor, hairBang, health, currentHealth, exp, currentExp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            userNo,
            initialLevel,
            initialCoin,
            initialBodySize,
            initialBodyShirt,
            initialSkin,
            initialHairColor,
            initialHairBang,
            initialHealth,
            initialCurrentHealth,
            initialExp,
            initialCurrentExp,
          ],
          (avatarErr, avatarResult) => {
            if (avatarErr) {
              // avatar 데이터 삽입 중 오류 발생 시 회원가입 롤백
              db.query(
                "DELETE FROM membertbl WHERE userNo=?",
                [userNo],
                (rollbackErr, rollbackResult) => {
                  if (rollbackErr) {
                    throw rollbackErr;
                  } else {
                    console.log("회원가입 롤백 완료");
                  }
                }
              );
              throw avatarErr;
            } else {
              // 회원가입 및 avatar 데이터 삽입 완료 시 클라이언트에게 결과 응답
              res.send(result);
            }
          }
        );
      }
    }
  );
});

authRouter.post("/idcheck", (req, res) => {
  const userId = req.body.userId;
  db.query(
    "SELECT * FROM membertbl WHERE userId=?",
    [userId],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/login", (req, res) => {
  const userId = req.body.userId;
  const userPw = req.body.userPw;
  db.query(
    "SELECT * FROM membertbl WHERE userId=? AND userPw=?",
    [userId, userPw],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/refresh", (req, res) => {
  const userNo = req.body.userNo;
  db.query(
    "SELECT * FROM membertbl WHERE userNo=?",
    [userNo],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/modify", (req, res) => {
  const { userNo, userPw, userIrum } = req.body.userInfo;
  db.query(
    "UPDATE membertbl SET userPw=?, userIrum=? WHERE userNo=?",
    [userPw, userIrum, userNo],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

authRouter.post("/remove", (req, res) => {
  const userNo = req.body.userNo;
  db.query("DELETE FROM membertbl WHERE userNo=?", [userNo], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

export default authRouter;
