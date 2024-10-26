const express = require("express");
const router = express.Router();
const forecastController = require("../controllers/forecastController");

router.get("/", forecastController.getWeather);
router.get("/long", forecastController.getLongWeather);
// router.get("/now", forecastController.getNow);
// router.get("/short-term", forecastController.getShortTerm);
// router.get("/long-term", forecastController.getLongTerm);
// router.get("/dust", forecastController.getDust);

router.get("/region", forecastController.getRegion);
router.get("/region-search", forecastController.searchRegion);

module.exports = router;
