import React from "react";
import { styled } from "styled-components";
import { LineChart, Line, YAxis, ResponsiveContainer, LabelList } from "recharts";
import { formatprecipitation, formatPrepcipitationForm, formatSkyState, formatTime } from "../../utils/formatWeather";

const ChartContainer = styled.div`
	position: relative;
	width: 700px;
	height: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	//
	border-radius: 30px;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 1);
	box-shadow: var(--box-shadow);
`;
const LineLabel = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const WeatherChart = ({ shortTerm }) => {
	// if (!shortTerm) {
	// 	// nowWeather나 관련 데이터가 없을 경우, 에러 방지용 처리
	// 	return <div>데이터를 불러오는 중입니다...</div>;
	// }

	// y축 범위를 동적으로 설정
	const getDynamicYAxis = (data) => {
		const values = data.map((item) => item.value);
		const min = Math.floor(Math.min(...values) / 5) * 5;
		const max = Math.ceil(Math.max(...values) / 5) * 5;
		return [min, max];
	};

	// 기온
	const temperature = shortTerm.temperature.map((item) => ({
		time: formatTime(item.fcstTime),
		value: Number(item.fcstValue),
	}));
	// 하늘 상태
	const skyState = shortTerm.skyState.map((item) => ({
		time: formatTime(item.fcstTime),
		value: formatSkyState(Number(item.fcstValue)),
	}));
	// 강수량
	const precipitation = shortTerm.precipitation.map((item) => ({
		time: formatTime(item.fcstTime),
		value: formatprecipitation(Number(item.fcstValue)),
	}));

	const [minY, maxY] = getDynamicYAxis(temperature);
	return (
		<ChartContainer>
			<LineLabel>
				{skyState.map((item, index) => (
					<div key={index}>
						<div>{item.value}</div>
					</div>
				))}
			</LineLabel>
			<ResponsiveContainer width="85%" height={120}>
				<LineChart margin={{ top: 40, right: 10, left: 10, bottom: 10 }} data={temperature}>
					<YAxis domain={[minY, maxY]} hide={true} />
					<Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }}>
						<LabelList dataKey="value" position="top" offset={20} />
					</Line>
				</LineChart>
			</ResponsiveContainer>
			<LineLabel>
				{temperature.map((item, index) => (
					<div key={index}>
						<div>{item.time}</div>
					</div>
				))}
			</LineLabel>
		</ChartContainer>
	);
};

export default WeatherChart;
