import { fetchRegionName } from "../store/region-slice/regionSlice";

// 장치의 현재 위치정보를 얻음
const getLocation = (dispatch) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				dispatch(fetchRegionName({ lat: latitude, lng: longitude }));
			},
			(error) => {
				console.error("Geolocation error: ", error);
				// 에러 처리 로직 추가 가능
			}
		);
	} else {
		console.error("지원하지 않는 브라우저입니다.");
	}
};

export default getLocation;
