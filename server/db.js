// 데이터베이스 연결하기
import mysql from "mysql";
export const db = mysql.createConnection({
   host : "192.168.100.132",
  // host : "192.168.100.xxx"
  user: "root",
  password: "1234",
  database: "habitica",
  database: "habitica",
});
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("Connected to the database.");
});
