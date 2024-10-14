const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv").config(); // 환경변수 사용
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
app.use(
  cors({
    origin: "http://localhost:3000", // 출처 허용 옵션
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);
app.use(express.json()); // JSON 데이터 처리. application/json
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 처리/ application/x-www-form-unlencoded
app.use(express.static("public")); // 서버가 가지고 있는 여러 종류의 파일을 클라에 그대로 전달할 때
app.use(cookieParser()); // for 토큰

// routes
app.use("/auth", authRoutes);

// Middleware
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
