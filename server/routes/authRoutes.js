const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
// 액세스 토큰 확인
router.get("/check-auth", authMiddleware, authController.checkAuth);
// 토큰 재발급
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
