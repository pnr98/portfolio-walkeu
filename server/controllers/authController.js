const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/tokenUtil");

// 회원가입 POST
exports.register = async (req, res) => {
  const userId = uuidv4().slice(0, 10); // 10글자
  try {
    // 회원가입시 필요한 정보들
    const { email, password, nickname } = req.body;
    const existingUser = await User.findByEmail(email);
    // 이미 존재하는 회원인지 이메일을 통해 확인
    if (existingUser) {
      console.log("서버: 이미 가입된 이메일입니다");
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
      return res.status(409).json({ message: "password not match" });
    }
    delete user.password;
    // 토큰 생성
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    // 서버 db에 refreshtoken저장
    await User.updateRefreshToken(refreshToken, user.userId);

    res.cookie("refreshToken", `Refresh ${refreshToken}`, {
      httpOnly: true, // js접근 불가
      // secure: false, //https에서만
      // sameSite: 'Strict',
    });
    res
      .status(200)
      .json({ message: "로그인에 성공했습니다", accessToken, user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "로그인에 실패했습니다", error: err.message });
  }
};

// 로그아웃 / POST
// 로그아웃 로직 흐름에서 액세스 토큰을 사용하지 않는 이유
// 액세스 토큰은 보통 짧은 유효 기간을 가지며, 로그아웃 요청이 들어올 때마다 사용하기에는 번거롭고 비효율적
// 액세스 토큰은 사용자가 API에 요청을 할 때마다 사용
exports.logout = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ message: "액세스 토큰이 필요합니다." });
  }
  try {
    const decoded = verifyToken(accessToken);
    await User.removeToken(decoded.userId);
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "로그아웃 완료" });
  } catch (error) {
    res.status(500).json({ message: "로그아웃 중 오류가 발생했습니다." });
  }
};

// checkAuth / GET
//
exports.checkAuth = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.getUserById(userId);
    // 해당 유저가 존재하지 않을 경우
    if (!user) {
      return res.status(404).json({ message: "유저를 찾을 수 없습니다" });
    }
    console.log("checkAuth");
    return res.status(200).json({
      user: {
        email: user.email,
        nickname: user.nickname,
        role: user.role,
      },
    });
  } catch (error) {
    if (
      error.message === "토큰이 만료되었습니다." ||
      error.message === "유효하지 않은 토큰입니다."
    ) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: "서버: 사용자 검증 실패" });
  }
};
// 리프레시 토큰으로 새 액세스 토큰 요청
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken
    ? req.cookies.refreshToken.split(" ")[1]
    : null;
  // 토큰이 없는 경우
  if (!refreshToken) {
    console.log("리프레시 토큰이 없습니다");
    return res.status(403).json({ message: "리프레시 토큰이 없습니다" });
  }
  try {
    // db에 저장된 토큰 유효성 확인
    const decoded = verifyToken(refreshToken);
    // 만료된 토큰이면 삭제하고 에러 응답
    if (!decoded) {
      console.log("2");
      await User.removeToken(refreshToken);
      return res
        .status(403)
        .json({ message: "만료된 토큰입니다. 다시 로그인 해주세요." });
    }
    // 토큰에서 userId를 찾고 일치하는 유저 확인
    const userId = await User.findByToken(refreshToken); // 해시화 풀기
    if (!userId) {
      return res.status(403).json({
        message: "리프레시 토큰이 유효하지 않습니다. 일치하는 유저가 없습니다",
      });
    }
    // 새로운 액세스 토큰 생성
    const newAccessToken = generateAccessToken({ userId });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "액세스 토큰 재발급 중 오류가 발생했습니다." });
  }
};
