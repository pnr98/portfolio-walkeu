import { useEffect, useState } from "react";

// 장치의 현재 위치 (위도, 경도) 반환
const useGeolocation = () => {
	const [position, setPosition] = useState({
		coordinates: {
			lat: 0,
			lng: 0,
		},
	});
	const [error, setError] = useState("");

	const onSuccess = (position) => {
		setPosition({
			coordinates: {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			},
		});
	};
	const onError = (error) => {
		setError(error.message);
	};

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		} else {
			setError("지원하지 않는 브라우저입니다.");
		}
	}, []);

	return { position, error };
};

export default useGeolocation;
