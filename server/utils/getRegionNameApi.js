const axios = require("axios");
const api_key = process.env.KAKAO_API_KEY;

// 현재 좌표에서 가까운 동네 비교
const compareRegion = (currentX, currentY, locationList) => {
  if (!Array.isArray(locationList)) {
    throw new Error("locationList 배열이 존재하지 않습니다.");
  }

  // currentX와 currentY를 숫자로 변환
  const currX = parseFloat(currentX);
  const currY = parseFloat(currentY);

  let closetLocation = null;
  let smallDistance = Infinity;
  const locationCoordinate = {
    position: {
      lat: 0,
      lng: 0,
    },
  };

  locationList.forEach((location) => {
    const deltaX = currX - parseFloat(location.x);
    const deltaY = currY - parseFloat(location.y);
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2); // 유클리드 거리계산

    if (distance < smallDistance) {
      smallDistance = distance;
      closetLocation = location;
      locationCoordinate.position.lng = parseFloat(location.x);
      locationCoordinate.position.lat = parseFloat(location.y);
    }
  });
  return closetLocation
    ? {
        address: closetLocation.address_name,
        coordinates: locationCoordinate.position,
      }
    : null;
};

exports.getRegionNameApi = async (lat, lng) => {
  try {
    // 카카오 api 사용
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode?`,
      {
        headers: {
          Authorization: `KakaoAK ${api_key}`,
        },
        params: {
          x: lng,
          y: lat,
        },
      }
    );
    const dataArray = response.data.documents;
    const regionData = await compareRegion(lng, lat, dataArray);

    return regionData;
  } catch (error) {
    // console.log("카카오 API 에러: ", error);
  }
};
