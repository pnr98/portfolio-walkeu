const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
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
    return jwt.verify(token, process.env.JWT_SECRET); // 만료되면 에러 발생
  } catch (error) {
    return null; // 만료된 토큰일 경우 null 반환
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
