import { styled } from "styled-components";
import {
	distinguishTime,
	formatAirQuality,
	formatprecipitation,
	formatPrepcipitationForm,
	formatSkyState,
	formatThermo,
	formatWindSpeed,
} from "../../utils/formatWeather";
import { getImageByForm } from "../../utils/getImageByForm";

const CardContainer = styled.div`
	border-radius: 30px;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 1);
	box-shadow: var(--box-shadow);
	width: 100%;
	height: 180px;
	font-size: 20px;
	text-align: center;
	padding: 16px 20px;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	/* position: relative; */
`;
const Title = styled.div`
	/* position: absolute;
	top: 18px;
	left: 18px; */
	display: flex;
	align-items: flex-end;

	color: var(--black-10);
	font-size: 18px;
	img {
		width: 20px;
		filter: opacity(0.4);
		margin-right: 8px;
	}
	.small-text {
		font-size: 14px;
		margin-left: 5px;
	}
`;
const CardContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.grade {
		color: ${(props) => {
			switch (props.grade) {
				case 1:
					return "var(--grade-blue)";
				case 2:
					return "var(--grade-green)";
				case 3:
					return "var(--grade-orange)";
				case 4:
					return "var(--grade-red)";
			}
		}};
		margin-bottom: 25px;
	}
	.grade-sky {
		margin-bottom: 10px;
	}
	.sky-icon {
		width: 40px;
	}
`;

const WeatherCard = ({ weatherData }) => {
	const { temperature, precipitationForm, precipitation, skyState, windSpeed, airQuality } = weatherData;

	const renderContent = () => {
		if (temperature) {
			const { grade, text } = formatThermo(Number(temperature.obsrValue));
			return (
				<>
					<Title>
						<img src={require("../../assets/weather-icon/thermometer.png")} />
						기온
						<span className="small-text">°C</span>
					</Title>
					<CardContent grade={grade}>
						<div className="grade">{text}</div>
						<div className="value">{temperature.obsrValue}</div>
					</CardContent>
				</>
			);
		} else if (windSpeed) {
			const { grade, text } = formatWindSpeed(Number(windSpeed.obsrValue));
			return (
				<>
					<Title>
						<img src={require("../../assets/weather-icon/wind.png")} />
						바람
						<span className="small-text">m/s</span>
					</Title>
					<CardContent grade={grade}>
						<div className="grade">{text}</div>
						<div className="value">{windSpeed.obsrValue}</div>
					</CardContent>
				</>
			);
		} else if (precipitationForm) {
			const form = formatPrepcipitationForm(Number(precipitationForm.obsrValue));
			const prcp = formatprecipitation(Number(precipitation.obsrValue));
			const nowSkyState = formatSkyState(Number(skyState[0]?.fcstValue));
			const fcstTime = distinguishTime(precipitationForm.baseTime);

			return (
				<>
					<Title>
						<img src={require("../../assets/weather-icon/sun.png")} />
						날씨
					</Title>
					<CardContent>
						<div className="grade-sky">
							<img className="sky-icon" src={getImageByForm(form, nowSkyState, fcstTime)} />
						</div>
						<div className="value">{form !== "없음" ? prcp : nowSkyState}</div>
					</CardContent>
				</>
			);
		} else if (airQuality) {
			const { grade, text } = formatAirQuality(Number(airQuality.khaiGrade));
			return (
				<>
					<Title>
						<img src={require("../../assets/weather-icon/dust.png")} />
						대기질
						<span className="small-text">CAI</span>
					</Title>
					<CardContent grade={grade}>
						<div className="grade">{text}</div>
						<div className="value">{airQuality.khaiValue}</div>
					</CardContent>
				</>
			);
		}
	};
	return <CardContainer>{renderContent()}</CardContainer>;
};

export default WeatherCard;
