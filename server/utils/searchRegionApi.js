const axios = require("axios");
const api_key = process.env.VWORLD_API_KEY;

exports.searchRegionApi = async (neighborhood) => {
  // bbox=14140071.146077,4494339.6527027,14160071.146077,4496339.6527027&
  // 사는 곳을 직접 입력받아
  try {
    const response = await axios.get("https://api.vworld.kr/req/search?", {
      params: {
        service: "search",
        request: "search",
        version: "2.0",
        crs: "EPSG:4326",
        size: 10,
        page: 1,
        query: neighborhood, // 동네이름
        type: "district", // DISTRICT : 행정구역
        category: "L4", // 읍면동
        format: "json",
        errorformat: "json",
        key: api_key,
      },
    });
    if (response.data.response.status === "NOT_FOUND") {
      console.log("찾을 수 없는 지역입니다.");
    }
    console.log(response.data.response.result.items);
    // [
    //   {
    //     id: '31110111',
    //     title: '울산광역시 중구 태화동',
    //     geometry: 'http://map.vworld.kr/data/geojson/district/31110111.geojson',
    //     point: { x: '129.3045', y: '35.5565416671' }
    //   },
    //   {
    //     id: '47170122',
    //     title: '경상북도 안동시 태화동',
    //     geometry: 'http://map.vworld.kr/data/geojson/district/47170122.geojson',
    //     point: { x: '128.714036001', y: '36.5611529999' }
    //   }
    // ]
    return response;
  } catch (error) {
    console.log("geocode error: ", error);
  }
};
