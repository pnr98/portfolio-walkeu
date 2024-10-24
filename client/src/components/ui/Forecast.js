import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../store/forecast-slice/forecastSlice";
import WeatherChart from "./WeatherChart";
import WeatherCard from "./WeatherCard";
import styled from "styled-components";

const ForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
`;

const CardContainer = styled.div`
	display: flex;
	gap: 20px;
`;
const Forecast = () => {
	const dispatch = useDispatch();
	const { position, address } = useSelector((state) => state.region);
	const { nowWeather, shortTerm, longTerm, airQuality, isLoading } = useSelector((state) => state.forecast);

	const showWeather = async (lat, lng, address) => {
		if (!lat || !lng) {
			return console.log("초단기 좌표 없음");
		}

		try {
			const response = await dispatch(fetchWeather({ lat, lng, address }));
			if (fetchWeather.fulfilled.match(response)) {
				console.log("날씨불러오기 ", response.payload);
			} else if (fetchWeather.rejected.match(response)) {
				console.log("초단기 실패 ", response.payload);
			}
		} catch (error) {
			console.log("날씨불러오기 실패 ", error);
		}
	};
	useEffect(() => {
		showWeather(position.lat, position.lng, address);
	}, [position]);

	// for Card
	const { precipitation, precipitationForm, temperature, windSpeed } = nowWeather;
	const { skyState } = shortTerm;

	return (
		<ForecastContainer>
			<div>산책추천 시간?</div>
			<CardContainer>
				<WeatherCard weatherData={{ precipitationForm, precipitation, skyState }} />
				<WeatherCard weatherData={{ temperature }} />
				<WeatherCard weatherData={{ windSpeed }} />
				<WeatherCard weatherData={{ airQuality }} />
			</CardContainer>
			<WeatherChart shortTerm={shortTerm} />
		</ForecastContainer>
	);
};

export default Forecast;
