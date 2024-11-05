const { verifyToken } = require("./tokenUtil");

const authMiddleware = async (req, res, next) => {
  console.log("미들웨어 실행");
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ message: "액세스 토큰이 필요합니다" });
  }
  try {
    const decoded = verifyToken(accessToken); // 유저 아이디 정보와 만료 정보
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = authMiddleware;
