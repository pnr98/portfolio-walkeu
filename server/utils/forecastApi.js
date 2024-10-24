const api_key = process.env.DECODING_KEY;
const air_api_key = process.env.CAST_API_KEY;
const axios = require("axios");
const { setBaseDateTime } = require("./convertFormat");
const { mapConv } = require("./mapConv");

exports.shortTermApi = async (lat, lng) => {
  try {
    // 기상청 api 사용
    const { x, y } = mapConv(lng, lat);
    const { baseDate, baseTime } = setBaseDateTime(0);

    const response = await axios.get(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst`,
      {
        params: {
          serviceKey: api_key,
          nx: x,
          ny: y,
          numOfRows: 60,
          pageNo: 1,
          dataType: "JSON",
          base_date: baseDate,
          base_time: baseTime,
        },
      }
    );

    const dataArray = response.data.response.body.items.item; // 배열
    console.log("shortTermApi");
    return dataArray;
  } catch (error) {
    console.log("기상청 API 에러: ", error);
    throw error;
  }
};

exports.nowWeatherApi = async (lat, lng) => {
  try {
    // 기상청 api 사용
    const { x, y } = mapConv(lng, lat);

    const { baseDate, baseTime } = setBaseDateTime(1);

    const response = await axios.get(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
      {
        params: {
          serviceKey: api_key,
          nx: x,
          ny: y,
          numOfRows: 8,
          pageNo: 1,
          dataType: "JSON",
          base_date: baseDate,
          base_time: baseTime,
        },
      }
    );

    const dataArray = response.data.response.body.items.item; // 배열
    console.log("nowWeatherApi");
    return dataArray;
  } catch (error) {
    console.log("기상청 API 에러: ", error);
    throw error;
  }
};

exports.longWeatherApi = async (lat, lng) => {
  try {
    // 기상청 api 사용
    const { x, y } = mapConv(lng, lat);
    const { baseDate, baseTime } = setBaseDateTime(2);

    const response = await axios.get(
      `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`,
      {
        params: {
          serviceKey: api_key,
          nx: x,
          ny: y,
          numOfRows: 918,
          pageNo: 1,
          dataType: "JSON",
          base_date: baseDate,
          base_time: baseTime,
        },
      }
    );

    const dataArray = response.data.response.body.items.item; // 배열
    console.log("longTermApi");
    return dataArray;
  } catch (error) {
    console.log("기상청 API 에러: ", error);
    throw error;
  }
};

exports.airQualityApi = async (address) => {
  const regionName = address.match(/(\S+동|\S+읍|\S+면)/)[0]; // 읍명동 추출
  console.log(regionName);
  try {
    // 에어코리아 api. 동네명을 넣어서 tm좌표 얻기
    const tmResults = await axios.get(
      `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getTMStdrCrdnt`,
      {
        params: {
          serviceKey: api_key,
          returnType: "JSON",
          numOfRows: 10,
          pageNo: 1,
          umdName: regionName,
          ver: 1.1,
        },
      }
    );

    const { tmX, tmY } = tmResults.data.response.body.items[0];
    // tm좌표로 측정소 목록얻기
    const msrstnResults = await axios.get(
      `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList`,
      {
        params: {
          serviceKey: api_key,
          returnType: "JSON",
          tmX: tmX,
          tmY: tmY,
        },
      }
    );
    //첫번째가 통신오류면 두번째 스테이션으로
    const { stationName } = msrstnResults.data.response.body.items[0];
    const sndStationName =
      msrstnResults.data.response.body.items[1].stationName;
    // 측정소명으로 대기질 얻기
    const getAirQuality = async (station) => {
      const response = await axios.get(
        `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty`,
        {
          params: {
            serviceKey: api_key,
            returnType: "JSON",
            numOfRows: 8,
            pageNo: 1,
            stationName: station,
            dataTerm: "DAILY",
            ver: 1.3,
          },
        }
      );
      return response.data.response.body.items[0];
    };

    let airQuality = await getAirQuality(stationName);

    if (airQuality.khaiValue === "-" || airQuality.khaiGrade === null) {
      airQuality = await getAirQuality(sndStationName);
    }
    const { khaiValue, khaiGrade } = airQuality;
    const airResult = { khaiValue, khaiGrade };

    return airResult;
  } catch (error) {
    console.log("에어 API 에러: ", error);
    throw error;
  }
};

// 1 LGT 낙뢰 PTY 강수형태
// 2 RN1 강수량 SKY 하늘상태
// 3 T1H 기온 REH 습도
// 4 UUU 동서 VVV 남북바람성분 XX
// 5 VEC 풍향 WSD 풍속

// 초단기 실황 8개
// 1 PTY 강수형태  REH 습도
// 2 RN1 강수량  T1H 기온
// 3 UUU 동서  VEC 풍향
// 4 VVV 남북  WSD 풍속

// 단기예보 918개 | 3일 + 4시간
// TMP	1시간 기온 UUU	풍속(동서성분)
// POP	강수확률 VVV	풍속(남북성분)
// VEC	풍향 WSD	풍속
// SKY	하늘상태 PTY	강수형태
// POP	강수확률 WAV	파고
// PCP	1시간 강수량 REH	습도
// SNO	1시간 신적설
// TMN	일 최저기온(0600) TMX	일 최고기온 (1500)
