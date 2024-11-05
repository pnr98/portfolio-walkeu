const express = require("express");
const router = express.Router();
const forecastController = require("../controllers/forecastController");

// 초단기실황
router.get("/now", forecastController.getNowWeather);
// 초단기예보
router.get("/short", forecastController.getShortWeather);
// 단기예보
router.get("/long", forecastController.getLongWeather);

//
router.get("/region", forecastController.getRegion);
router.get("/region-search", forecastController.searchRegion);

module.exports = router;
