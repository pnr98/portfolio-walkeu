const {
  shortTermApi,
  nowWeatherApi,
  airQualityApi,
  longWeatherApi,
} = require("../utils/forecastApi");
const { getRegionNameApi } = require("../utils/getRegionNameApi");
const { handleWeather } = require("../utils/handleWeather");
const { searchRegionApi } = require("../utils/searchRegionApi");

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

// shortTerm
exports.getShortTerm = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }

  try {
    const rawWeather = await shortTermApi(lat, lng);
    const shortTermData = handleWeather(rawWeather); // 데이터 가공
    return res.status(200).json({ shortTermList: shortTermData });
  } catch (error) {
    return res.status(500).json({ error: "초단기예보를 가져오지 못했습니다" });
  }
};

// 미세먼지
exports.getWeather = async (req, res) => {
  const { lat, lng, addr } = req.query;
  const results = {
    nowWeather: null,
    shortTerm: null,
    longTerm: null,
    airQuality: null,
    errors: [],
  };

  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }

  try {
    // 초단기실황
    try {
      const rawWeather = await nowWeatherApi(lat, lng);
      results.nowWeather = handleWeather(rawWeather, "now");
    } catch (error) {
      results.errors.push("초단기실황 데이터를 가져오지 못했습니다.");
    }
    // 초단기예보
    try {
      const rawWeather = await shortTermApi(lat, lng);
      results.shortTerm = handleWeather(rawWeather, "short");
    } catch (error) {
      results.errors.push("초단기예보 데이터를 가져오지 못했습니다.");
    }
    // 단기예보
    // try {
    //   const rawWeather = await longWeatherApi(lat, lng);
    //   results.longTerm = handleWeather(rawWeather, "long");
    // } catch (error) {
    //   results.errors.push("단기예보 데이터를 가져오지 못했습니다.");
    // }
    // 대기질. 실시간
    try {
      const rawWeather = await airQualityApi(addr);
      results.airQuality = rawWeather;
    } catch (error) {
      results.errors.push("대기질 데이터를 가져오지 못했습니다.");
    }
    if (results.errors.length === 0) {
      console.log("초단기 날씨 불러오기 전부 성공");
    }

    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "서버에서 데이터를 가져오는 도중 오류가 발생했습니다." });
  }
};

exports.getLongWeather = async (req, res) => {
  const { lat, lng } = req.query;
  const results = {
    longTerm: null,
    errors: [],
  };

  if (!lat || !lng) {
    return res.status(400).send("위도와 경도를 제공해야 합니다.");
  }
  try {
    // 단기예보
    const rawWeather = await longWeatherApi(lat, lng);
    results.longTerm = handleWeather(rawWeather, "long");

    if (results.errors.length === 0) {
      console.log("단기 날씨 불러오기 전부 성공");
    }
    return res.status(200).json(results);
  } catch (error) {
    results.errors.push("단기예보 데이터를 가져오지 못했습니다.");
    return res
      .status(500)
      .json({ error: "서버에서 데이터를 가져오는 도중 오류가 발생했습니다." });
  }
};
