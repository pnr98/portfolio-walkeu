const express = require("express");
const walkCotroller = require("../controllers/walkCotroller");

const router = express.Router();

router.get("/", walkCotroller.fetchWalk);
router.post("/add", walkCotroller.addWalk);
router.delete("/delete/:date", walkCotroller.deleteWalk);

module.exports = router;
