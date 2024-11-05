const express = require("express");
const walkCotroller = require("../controllers/walkCotroller");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, walkCotroller.fetchWalk);
router.post("/add", authMiddleware, walkCotroller.addWalk);
router.delete("/delete/:date", authMiddleware, walkCotroller.deleteWalk);

module.exports = router;
