const {
  shortTermApi,
  nowWeatherApi,
  airQualityApi,
  longWeatherApi,
} = require("../utils/forecastApi");
const { getRegionNameApi } = require("../utils/getRegionNameApi");
const { handleWeather } = require("../utils/handleWeather");
const { searchRegionApi } = require("../utils/searchRegionApi");

// 에러 메시지 상수
const ERROR_MESSAGES = {
  missingCoordinates: "위도와 경도를 제공해야 합니다.",
  missingAddress: "동네명을 제공해야 합니다.",
  nowWeatherFetch: "초단기실황 데이터를 가져오지 못했습니다.",
  airQualityFetch: "대기질 데이터를 가져오지 못했습니다.",
  serverError: "서버에서 데이터를 가져오는 도중 오류가 발생했습니다.",
};

// 현재 위치 정보로 동네명 불러오기
exports.getRegion = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }

  try {
    const regionData = await getRegionNameApi(lat, lng);
    return res.json({
      regionName: regionData.address,
      position: regionData.coordinates,
    });
  } catch (error) {
    return res.status(500).json({ error: "지역정보를 가져오지 못했습니다" });
  }
};

// 동네 검색하기
exports.searchRegion = async (req, res) => {
  const { neighborhood } = req.query;
  if (!neighborhood) {
    return res.status(400).send("동네명를 제공해야 합니다.");
  }

  try {
    const regionData = await searchRegionApi(neighborhood);
    return res.json(regionData);
  } catch (error) {
    return res.status(500).json({ error: "동네명를 가져오지 못했습니다" });
  }
};

// 초단기 실황
exports.getNowWeather = async (req, res) => {
  const { lat, lng, addr } = req.query;
  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }
  if (!addr) {
    return res.status(400).send("동네명을 제공해야 합니다.");
  }
  const results = {
    precipitationForm: [],
    precipitation: [],
    temperature: [],
    humidity: [],
    windSpeed: [],
    airQuality: null,
    errors: [],
  };
  try {
    // 초단기실황
    try {
      const rawWeather = await nowWeatherApi(lat, lng);
      const nowWeather = handleWeather(rawWeather, "now");
      Object.assign(results, nowWeather);
    } catch (error) {
      results.errors.push("초단기실황 데이터를 가져오지 못했습니다.");
    }
    // 대기질. 실시간
    try {
      const rawWeather = await airQualityApi(addr);
      results.airQuality = rawWeather;
    } catch (error) {
      results.errors.push("대기질 데이터를 가져오지 못했습니다.");
    }
    console.log("초단기실황 성공");

    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "서버에서 데이터를 가져오는 도중 오류가 발생했습니다." });
  }
};
// 초단기 예보
exports.getShortWeather = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }

  const results = {
    precipitationForm: [], //PTY 강수형태 12
    precipitation: [], //RN1 강수량 18
    skyState: [], //SKY 하늘상태 24
    temperature: [], //T1H 기온 30
    humidity: [], //REH 습도 36
    windSpeed: [], //WSD 풍속 54-60
  };

  // 초단기예보
  try {
    const rawWeather = await shortTermApi(lat, lng);
    const shortTerm = handleWeather(rawWeather, "short");
    Object.assign(results, shortTerm);
    console.log("초단기예보 성공");
    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "서버에서 데이터를 가져오는 도중 오류가 발생했습니다." });
  }
};

exports.getLongWeather = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }

  const results = {
    prcpProbability: [],
    thermoMinimum: [],
    thermoMaximum: [],
  };

  try {
    // 단기예보
    const rawWeather = await longWeatherApi(lat, lng);
    const longTerm = handleWeather(rawWeather, "long");
    Object.assign(results, longTerm);
    console.log("단기예보 성공");
    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "서버에서 데이터를 가져오는 도중 오류가 발생했습니다." });
  }
};
