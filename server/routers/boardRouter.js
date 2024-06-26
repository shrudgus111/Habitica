import express from "express";
import { db } from "../db.js";
import dayjs from "dayjs";

const boardRouter = express.Router();

boardRouter.post("/notice/write", (req, res) => {
  const { userNo } = req.body;
  const { writer, subject, content } = req.body.board;
  const date = dayjs();
  db.query(
    "INSERT INTO noticetbl (subject, writer, date, hit, content, userNo) VALUES (?, ?, ?, ?, ?, ?)",
    [subject, writer, date.format("YYYY-MM-DD"), 0, content, userNo],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

boardRouter.get("/notice/list", (req, res) => {
  const page = parseInt(req.query.page);
  const itemsPerPage = 10; // 페이지당 아이템 수

  const offset = (page - 1) * itemsPerPage; // 오프셋 계산

  const countQuery = "SELECT COUNT(*) AS totalCount FROM noticetbl";
  const dataQuery = "SELECT * FROM noticetbl ORDER BY noNo DESC LIMIT ?, ?";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      res.status(500).send("공지글 가져오기 실패");
      throw err;
    } else {
      console.log("카운트 어떻게 생겼니?", countResult);
      const totalCount = countResult[0].totalCount;
      db.query(dataQuery, [offset, itemsPerPage], (errData, dataResult) => {
        if (errData) {
          res.status(500).send("공지글 가져오기 실패");
        } else {
          res.send({
            totalCount: totalCount,
            data: dataResult,
          });
        }
      });
    }
  });
});

boardRouter.get("/notice/hit", (req, res) => {
  const noNo = req.query.no;
  const hit = parseInt(req.query.hit);
  db.query(
    "UPDATE noticetbl SET hit=? WHERE noNo=?",
    [hit + 1, noNo],
    (err, result) => {
      if (err) {
        res.status(500).send("수정 실패");
      } else {
        res.send(result);
      }
    }
  );
});

boardRouter.post("/notice/modify", (req, res) => {
  const { noNo, subject, content } = req.body.board;
  db.query(
    "UPDATE noticetbl SET subject=?, content=? WHERE noNo=?",
    [subject, content, noNo],
    (err, result) => {
      if (err) {
        res.status(500).send("수정 실패");
      } else {
        res.send(result);
      }
    }
  );
});

boardRouter.get("/notice/remove", (req, res) => {
  const noNo = req.query.no;
  db.query("DELETE FROM noticetbl WHERE noNo=?", [noNo], (err, result) => {
    if (err) {
      res.status(500).send("실패");
    } else {
      res.send(result);
    }
  });
});

boardRouter.post("/review/write", (req, res) => {
  const { userNo } = req.body;
  const { writer, subject, content } = req.body.board;
  const date = dayjs();
  db.query(
    "INSERT INTO reviewtbl (subject, writer, date, hit, content, userNo) VALUES (?, ?, ?, ?, ?, ?)",
    [subject, writer, date.format("YYYY-MM-DD"), 0, content, userNo],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

boardRouter.get("/review/list", (req, res) => {
  const page = parseInt(req.query.page);
  const itemsPerPage = 10; // 페이지당 아이템 수

  const offset = (page - 1) * itemsPerPage; // 오프셋 계산

  const countQuery = "SELECT COUNT(*) AS totalCount FROM reviewtbl";
  const dataQuery = "SELECT * FROM reviewtbl ORDER BY reNo DESC LIMIT ?, ?";

  db.query(countQuery, (err, countResult) => {
    if (err) {
      res.status(500).send("공지글 가져오기 실패");
      throw err;
    } else {
      console.log("카운트 어떻게 생겼니?", countResult);
      const totalCount = countResult[0].totalCount;
      db.query(dataQuery, [offset, itemsPerPage], (errData, dataResult) => {
        if (errData) {
          res.status(500).send("공지글 가져오기 실패");
        } else {
          res.send({
            totalCount: totalCount,
            data: dataResult,
          });
        }
      });
    }
  });
});

boardRouter.get("/review/hit", (req, res) => {
  const reNo = req.query.no;
  const hit = parseInt(req.query.hit);
  db.query(
    "UPDATE reviewtbl SET hit=? WHERE reNo=?",
    [hit + 1, reNo],
    (err, result) => {
      if (err) {
        res.status(500).send("수정 실패");
      } else {
        res.send(result);
      }
    }
  );
});

boardRouter.post("/review/modify", (req, res) => {
  const { reNo, subject, content } = req.body.board;
  db.query(
    "UPDATE reviewtbl SET subject=?, content=? WHERE reNo=?",
    [subject, content, reNo],
    (err, result) => {
      if (err) {
        res.status(500).send("수정 실패");
      } else {
        res.send(result);
      }
    }
  );
});

boardRouter.get("/review/remove", (req, res) => {
  const reNo = req.query.reNo;
  db.query("DELETE FROM reviewtbl WHERE reNo=?", [reNo], (err, result) => {
    if (err) {
      res.status(500).send("실패");
    } else {
      res.send(result);
    }
  });
});

export default boardRouter;
