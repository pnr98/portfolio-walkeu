import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLongWeather, fetchWeather } from "../../store/forecast-slice/forecastSlice";
import WeatherChart from "./WeatherChart";
import WeatherCard from "./WeatherCard";
import styled from "styled-components";
import WeatherLong from "./WeatherLong";

const ForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
`;

const CardContainer = styled.div`
	display: flex;
	gap: 20px;
`;
// 오래걸리는 작업 때문에 로딩상태를 따로 관리.
const Forecast = () => {
	const dispatch = useDispatch();
	const { position, address } = useSelector((state) => state.region);
	const { nowWeather, shortTerm, longTerm, airQuality } = useSelector((state) => state.forecast);

	const [shortTermLoading, setShortTermLoading] = useState(true);
	const [longTermLoading, setLongTermLoading] = useState(true);

	const showWeather = async (lat, lng, address) => {
		if (!lat || !lng) {
			return console.log("좌표 없음");
		}
		setShortTermLoading(true);
		try {
			await dispatch(fetchWeather({ lat, lng, address }));
		} catch (error) {
			console.log("초단기 실패 ", error);
		} finally {
			setShortTermLoading(false);
		}
	};

	const showLongWeather = async (lat, lng) => {
		if (!lat || !lng) {
			return console.log("단기 좌표 없음");
		}
		setLongTermLoading(true);
		try {
			await dispatch(fetchLongWeather({ lat, lng }));
		} catch (error) {
			console.log("단기예보 실패 ", error);
		} finally {
			setLongTermLoading(false);
		}
	};

	useEffect(() => {
		showWeather(position.lat, position.lng, address);
		showLongWeather(position.lat, position.lng);
	}, [position]);

	// for Card
	const { precipitation, precipitationForm, temperature, windSpeed } = nowWeather;
	const { skyState } = shortTerm;

	return (
		<ForecastContainer>
			<div>산책추천 시간?</div>
			{!shortTermLoading ? (
				<>
					<CardContainer>
						<WeatherCard weatherData={{ precipitationForm, precipitation, skyState }} />
						<WeatherCard weatherData={{ temperature }} />
						<WeatherCard weatherData={{ windSpeed }} />
						<WeatherCard weatherData={{ airQuality }} />
					</CardContainer>
					<WeatherChart shortTerm={shortTerm} />
				</>
			) : (
				"데이터 불러오는 중..."
			)}
			{!longTermLoading ? <WeatherLong longTerm={longTerm} /> : "데이터 불러오는 중..."}
		</ForecastContainer>
	);
};

export default Forecast;
