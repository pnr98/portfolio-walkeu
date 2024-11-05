import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLongWeather, fetchNowWeather, fetchShortWeather } from "../../store/forecast-slice/forecastSlice";
import WeatherChart from "./WeatherChart";
import WeatherCard from "./WeatherCard";
import styled from "styled-components";
import WeatherLong from "./WeatherLong";
import {
	useFetchLongWeatherQuery,
	useFetchNowWeatherQuery,
	useFetchShortWeatherQuery,
} from "../../store/forecast-slice/forecastApi";

const ForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
	width: 700px;

	.measurement {
		color: var(--black-10);
		padding: 10px;
	}
`;
const NowForecast = styled.div`
	.card-container {
		display: flex;
		gap: 20px;
	}
`;

const ShortForecast = styled.div``;

const LongForecast = styled.div``;

// 위치를 확인해 위치가 변경되면 요청을 다시 보내야함.
const Forecast = ({ address, position }) => {
	const dispatch = useDispatch();
	// const { position, address } = useSelector((state) => state.region);

	const {
		data: nowWeather,
		isLoading: nowIsLoading,
		refetch: refetchNow,
	} = useFetchNowWeatherQuery(
		{
			lat: position.lat,
			lng: position.lng,
			addr: address,
		}
		// { refetchOnMountOrArgChange: true }
	);
	const {
		data: shortTerm,
		isLoading: shortTermIsLoading,
		refetch: refetchShort,
	} = useFetchShortWeatherQuery(
		{
			lat: position.lat,
			lng: position.lng,
		}
		// { refetchOnMountOrArgChange: true }
	);
	const {
		data: longTerm,
		isLoading: longTermIsLoading,
		refetch: refetchLong,
	} = useFetchLongWeatherQuery(
		{
			lat: position.lat,
			lng: position.lng,
		}
		// { refetchOnMountOrArgChange: true }
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const minutes = now.getMinutes();
			const hours = now.getHours();

			if (minutes === 11) {
				refetchNow();
			}
			if (minutes === 46) {
				refetchShort();
			}
			if ((hours === 2 || hours === 17) && minutes === 11) {
				refetchLong();
			}
		}, 60 * 1000); // 1분마다 조건 체크

		return () => clearInterval(intervalId);
	}, []);
	if (nowIsLoading || shortTermIsLoading || longTermIsLoading) {
		return <div>데이터 불러오는 중...</div>;
	}
	// const precipitation = nowWeather?.precipitation || [];
	// const precipitationForm = nowWeather?.precipitationForm || [];
	// const temperature = nowWeather?.temperature || [];
	// const windSpeed = nowWeather?.windSpeed || [];
	// const airQuality = nowWeather?.airQuality || {};

	const { precipitation, precipitationForm, temperature, windSpeed, airQuality } = nowWeather || {};
	const { skyState } = shortTerm || {};

	// 기존
	// const { nowWeather, shortTerm, longTerm } = useSelector((state) => state.forecast);

	// const [nowIsLoading, setNowIsLoading] = useState(true);
	// const [shortTermIsLoading, setShortTermIsLoading] = useState(true);
	// const [longTermIsLoading, setLongTermIsLoading] = useState(true);

	// const showNowWeather = async (lat, lng, address) => {
	// 	if (!lat || !lng) {
	// 		return console.log("좌표 없음");
	// 	}
	// 	setNowIsLoading(true);
	// 	try {
	// 		await dispatch(fetchNowWeather({ lat, lng, address }));
	// 	} catch (error) {
	// 		console.log("초단기 실패 ", error);
	// 	} finally {
	// 		setNowIsLoading(false);
	// 	}
	// };

	// const showShortWeather = async (lat, lng) => {
	// 	if (!lat || !lng) {
	// 		return console.log("좌표 없음");
	// 	}
	// 	setShortTermIsLoading(true);
	// 	try {
	// 		await dispatch(fetchShortWeather({ lat, lng }));
	// 	} catch (error) {
	// 		console.log("초단기 실패 ", error);
	// 	} finally {
	// 		setShortTermIsLoading(false);
	// 	}
	// };

	// const showLongWeather = async (lat, lng) => {
	// 	if (!lat || !lng) {
	// 		return console.log("단기 좌표 없음");
	// 	}
	// 	setLongTermIsLoading(true);
	// 	try {
	// 		await dispatch(fetchLongWeather({ lat, lng }));
	// 	} catch (error) {
	// 		console.log("단기예보 실패 ", error);
	// 	} finally {
	// 		setLongTermIsLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	showNowWeather(position.lat, position.lng, address);
	// 	showShortWeather(position.lat, position.lng);
	// 	showLongWeather(position.lat, position.lng);
	// }, [position]);

	// // for Card
	// const { precipitation, precipitationForm, temperature, windSpeed, airQuality } = nowWeather;
	// const { skyState } = shortTerm;

	// 측정시간
	const getMeasureTime = (data, code) => {
		const baseDate = data?.baseDate;
		const fcstDate = baseDate
			? `${baseDate?.slice(0, 4)}년 ${baseDate?.slice(4, 6)}월 ${baseDate?.slice(6, 8)}일`
			: null;

		const baseTime = data?.baseTime;
		let fcstTime = null;
		if (code === 0) {
			fcstTime = baseTime ? `${baseTime?.slice(0, 2)}:45` : null;
		} else if (code === 1) {
			fcstTime = baseTime ? `${baseTime?.slice(0, 2)}:10` : null;
		}
		return fcstDate && fcstTime ? `${fcstDate} ${fcstTime}` : null;
	};

	return (
		<ForecastContainer>
			<div>산책추천 시간?</div>
			{!nowIsLoading ? (
				<NowForecast>
					<div className="card-container">
						<WeatherCard weatherData={{ precipitationForm, precipitation, skyState }} />
						<WeatherCard weatherData={{ temperature }} />
						<WeatherCard weatherData={{ windSpeed }} />
						<WeatherCard weatherData={{ airQuality }} />
					</div>
					<div className="measurement">측정시간 : {getMeasureTime(temperature, 1)} </div>
				</NowForecast>
			) : (
				"데이터 불러오는 중..."
			)}
			{!shortTermIsLoading ? (
				<>
					<ShortForecast>
						<WeatherChart shortTerm={shortTerm} />
						<div className="measurement">측정시간 : {getMeasureTime(shortTerm.temperature[0], 0)} </div>
					</ShortForecast>
				</>
			) : (
				"데이터 불러오는 중..."
			)}
			{!longTermIsLoading && longTerm ? <WeatherLong longTerm={longTerm} /> : "데이터 불러오는 중..."}
		</ForecastContainer>
	);
};

export default Forecast;
