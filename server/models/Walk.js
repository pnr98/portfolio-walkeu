const db = require("../database/database");
// 산책 기록

const Walk = {
  // 사용자의 산책 기록 불러오기 해당년도의 해당 달의 모든 날짜
  getWalkRecordById: async ({ userId, date }) => {
    const query =
      'SELECT DATE_FORMAT(walkDate, "%Y-%m-%d") AS walkDate FROM walks WHERE userId = ? AND DATE_FORMAT(walkDate, "%Y-%m") = ?';
    const [rows] = await db.execute(query, [userId, date]);
    return rows;
  },
  // 산책 기록 추가하기 2024-09-15 형태
  addWalkDate: async ({ userId, date }) => {
    const query = "INSERT INTO walks (userId, walkDate) VALUES (?, ?)";
    const [rows] = await db.execute(query, [userId, date]);
    return rows;
  },
  // 산책 기록 삭제하기
  deleteWalkDate: async ({ userId, date }) => {
    const query = "DELETE FROM walks WHERE userId = ? AND walkDate = ?";
    const [rows] = await db.execute(query, [userId, date]);
    return rows.affectedRows > 0; // 삭제된 행 수로 성공 여부 반환
  },
  fideOne: async ({ userId, date }) => {
    const query = "SELECT * FROM walks WHERE userId = ? AND DATE(walkDate) = ?";
    const [rows] = await db.execute(query, [userId, date]);
    //console.log(rows); // { id: 336, userId: '3e4623d9-c', walkDate: 2024-10-01T15:00:00.000Z }
    return rows;
  },
};

module.exports = Walk;

// create table walks (
//     -> id INT AUTO_INCREMENT PRIMARY KEY,
//     -> userId VARCHAR(10),
//     -> walkDate DATE,
//     -> FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
//     -> );

// ALTER TABLE walks ADD UNIQUE (walkDate, userId);
//해당 날짜와 사용자 ID의 조합이 유일
