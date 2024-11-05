const db = require("../database/database");
// 사용자와 관련된 모든 메서드

// query 대신 excute사용 : 쿼리 실행 시 매개변수를 미리 처리하여 성능을 약간 개선. SQL 인젝션 공격을 방지하기 위해 파라미터 바인딩을 사용.
// 후속 실행 시 동일한 쿼리 구조를 재사용
const Profile = {
  // 강아지 정보 조회 (northern, brachy, weakness)
  getPuppyById: async (userId) => {
    const query =
      "SELECT name, size, northern, brachy, weakness FROM dogs WHERE userId = ?";
    const [rows] = await db.execute(query, [userId]);
    return rows[0];
  },
  // 강아지 정보 생성  (1마리만 생성가능.)
  createPuppy: async ({ userId, name, size, etc }) => {
    const { northern, brachycephalic: brachy, seniorOrJunior: weakness } = etc;
    const query =
      "INSERT INTO dogs (userId, name, size, northern, brachy, weakness) VALUES (?, ?, ?, ?, ?, ?)";
    await db.execute(query, [userId, name, size, northern, brachy, weakness]);
  },
  // 강아지 정보 수정
  editPuppy: async ({ userId, name, size, etc }) => {
    const { northern, brachycephalic: brachy, seniorOrJunior: weakness } = etc;
    console.log(userId, name, size, etc);
    const query =
      "UPDATE dogs SET name = ?, size = ?, northern = ?, brachy = ?, weakness = ? WHERE userId = ?";
    await db.execute(query, [name, size, northern, brachy, weakness, userId]);
  },
};

module.exports = Profile;

// dogId , name, weight, userId(주인)
