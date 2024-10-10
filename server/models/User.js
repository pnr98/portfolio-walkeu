const db = require("../database/database");
// 사용자와 관련된 모든 메서드

// query 대신 excute사용 : 쿼리 실행 시 매개변수를 미리 처리하여 성능을 약간 개선. SQL 인젝션 공격을 방지하기 위해 파라미터 바인딩을 사용.
// 후속 실행 시 동일한 쿼리 구조를 재사용
const User = {
  findByEmail: async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },
  createUser: async ({ userId, email, password, nickname }) => {
    const query =
      "INSERT INTO users (userId, email, password, nickname) VALUES (?, ?, ?, ?)";
    await db.execute(query, [userId, email, password, nickname]);
  },
};

module.exports = User;