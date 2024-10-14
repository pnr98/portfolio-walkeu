const db = require("../database/database");
// 사용자와 관련된 모든 메서드

// query 대신 excute사용 : 쿼리 실행 시 매개변수를 미리 처리하여 성능을 약간 개선. SQL 인젝션 공격을 방지하기 위해 파라미터 바인딩을 사용.
// 후속 실행 시 동일한 쿼리 구조를 재사용
const User = {
  //
  getUserById: async (userId) => {
    const query = "SELECT email, nickname, role FROM users WHERE userId = ?";
    const [rows] = await db.execute(query, [userId]);
    return rows[0];
  },
  // 회원가입 / 유저 생성
  createUser: async ({ userId, email, password, nickname }) => {
    const query =
      "INSERT INTO users (userId, email, password, nickname) VALUES (?, ?, ?, ?)";
    await db.execute(query, [userId, email, password, nickname]);
  },
  // 회원가입 / 이미 존재하는 이메일인지
  findByEmail: async (email) => {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  },
  // 로그인 시 리프레시 토큰 생성
  updateRefreshToken: async (refreshToken, userId) => {
    const query = "UPDATE users SET refreshToken = ? WHERE userId = ?";
    await db.execute(query, [refreshToken, userId]);
  },
  // 로그아웃or리프레시 만료시 토큰 삭제
  removeToken: async (userId) => {
    const query = "UPDATE users SET refreshToken = NULL WHERE userId = ?";
    await db.execute(query, [userId]);
  },
  // 사용자 검증 / 로그인 유지. 액세스 토큰 재발급
  findByToken: async (refreshToken) => {
    const query = "SELECT userId FROM users WHERE refreshToken = ?";
    const [rows] = await db.execute(query, [refreshToken]);
    return rows[0] ? rows[0].userId : null;
  },
};

module.exports = User;
