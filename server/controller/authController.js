const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// 회원가입 POST
exports.register = async (req, res) => {
  const userId = uuidv4().slice(0, 10); // 10글자
  try {
    // 회원가입시 필요한 정보들
    const { email, password, nickname } = req.body;
    const existingUser = await User.findByEmail(email);
    // 이미 존재하는 회원인지 이메일을 통해 확인
    if (existingUser) {
      console.log("서버: 이미 가입된 이메일입니다")
      return res.status(409).json({ message: "이미 가입된 이메일입니다" });
    }
    // 비밀번호 해시화
    const salt = await bcrypt.genSalt(); // 랜덤값을 받음
    const hashedPassword = await bcrypt.hash(password, salt);
    // 유저 생성
    await User.createUser({
      userId,
      email,
      password: hashedPassword,
      nickname,
    });
    // 성공적일때
    res
      .status(200)
      .json({ message: "회원가입이 성공했습니다", user: { userId } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "회원가입이 실패했습니다", error: err.message });
  }
};

// 로그인 POST
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(409).json({ message: "User not exist" });
    }
    // 해쉬된 비번과 매치하는 지
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("서버: 비밀번호 매치: ", user.password);
      return res.status(409).json({ message: "password not match" });
    }
    console.log("서버: 비밀번호 매치: ", user.password);
    // JWT 토큰 생성
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);
    // 비밀번호 필드를 응답에서 제거
    delete user.password;
    res.status(200).json({ message: "로그인에 성공했습니다", token, user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "로그인에 실패했습니다", error: err.message });
  }
};

exports.logout = async (req, res) => {
  // res.clearCookie("token").json({
    
  // })

  console.log("서버: 로그아웃 시도")
}