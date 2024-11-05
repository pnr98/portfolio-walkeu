const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const generateRefreshToken = () => {
  // 이후 해시화하여 db에 저장?
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("토큰이 만료되었습니다.");
    }
    throw new Error("유효하지 않은 토큰입니다.");
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
