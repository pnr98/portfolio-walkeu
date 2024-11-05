const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../utils/authMiddleware");

//
router.get("/mypage", authMiddleware, profileController.getMyPage);
//
router.get("/mypuppy", authMiddleware, profileController.getMyPuppy);
router.post("/mypuppy/create", authMiddleware, profileController.createMyPuppy);
router.put("/mypuppy/edit", authMiddleware, profileController.editMyPuppy);

module.exports = router;
