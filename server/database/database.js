const mysql = require("mysql2/promise");

const db = mysql.createPool({
  user: "pnr98",
  host: "127.0.0.1",
  database: "walkeu_db",
  password: "as9950as",
});

db.getConnection()
  .then(() => console.log("db 연결 성공"))
  .catch((err) => console.log("db연결 실패: ", err));

module.exports = db;
// API 가 호출될때마다 연결을 시도
// 이렇게 되면 자원손해가 크기 때문에 연결을 하고 나서 이를 재사용할 수 있도록 하는게 목표
