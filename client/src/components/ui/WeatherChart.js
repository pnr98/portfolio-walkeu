import React from "react";
import { styled } from "styled-components";
import { LineChart, Line, YAxis, ResponsiveContainer, LabelList } from "recharts";
import {
	distinguishTime,
	formatprecipitation,
	formatPrepcipitationForm,
	formatSkyState,
	formatTime,
} from "../../utils/formatWeather";
import { getImageByForm } from "../../utils/getImageByForm";

const TableConatiner = styled.div`
	width: 700px;
	height: 380px;
	display: flex;
	align-items: center;
	justify-content: center;
	//
	border-radius: 30px;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 1);
	box-shadow: var(--box-shadow);
	padding: 30px;
`;

const Table = styled.table`
	display: table;
	width: 100%;
	height: 100%;
	border-collapse: collapse;
	color: var(--black-20);
	th {
		font-weight: 600;
		color: var(--black-20);
	}
`;
const TableHeader = styled.thead``;

const TableBody = styled.tbody`
	th,
	td {
		padding-top: 20px;
	}

	td {
		vertical-align: middle;
		text-align: center;
	}
	.category {
		text-align: left;
	}
	.unit {
		text-align: left;
		font-size: 12px;
		color: var(--black-10);
		font-weight: 500;
	}
	.sky-icon {
		width: 35px;
	}
	.chart {
		text-align: center;
		height: 100%;
		padding: 0px 35px;
	}
`;

const WeatherChart = ({ shortTerm }) => {
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
	// 습도
	const humidity = shortTerm.humidity.map((item) => ({
		time: item.fcstTime,
		value: Number(item.fcstValue),
	}));
	// 하늘 상태
	const skyState = shortTerm.skyState.map((item) => ({
		time: item.fcstTime,
		value: formatSkyState(Number(item.fcstValue)),
	}));
	// 강수량
	const precipitation = shortTerm.precipitation.map((item) => ({
		time: item.fcstTime,
		value: formatprecipitation(item.fcstValue === "강수없음" ? "강수없음" : Number(item.fcstValue)),
	}));
	// 강수 형태
	const prcpForm = shortTerm.precipitationForm.map((item) => ({
		time: item.fcstTime,
		value: formatPrepcipitationForm(Number(item.fcstValue)),
	}));

	const [minY, maxY] = getDynamicYAxis(temperature);
	return (
		<TableConatiner>
			<Table>
				<TableHeader>
					<tr>
						<th></th>
						{temperature.map((item, index) => (
							<th key={index}>
								<div>{item.time}</div>
							</th>
						))}
					</tr>
				</TableHeader>
				<TableBody>
					<tr className="skyState">
						<th></th>
						{skyState.map((item, index) => (
							<td key={index}>
								<img
									className="sky-icon"
									src={getImageByForm(prcpForm[index]?.value, item.value, distinguishTime(item.time))}
								/>
							</td>
						))}
					</tr>
					<tr className="temperature">
						<th></th>
						<td className="chart" colspan="6">
							<ResponsiveContainer width="100%" height={100}>
								<LineChart margin={{ top: 40, right: 14, left: 14, bottom: 10 }} data={temperature}>
									<YAxis domain={[minY, maxY]} hide={true} />
									<Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }}>
										<LabelList dataKey="value" position="top" offset={20} formatter={(value) => `${value}°`} dx={3} />
									</Line>
								</LineChart>
							</ResponsiveContainer>
						</td>
					</tr>
					<tr className="precipitation">
						<th>
							<div>
								<div className="category">강수량</div>
								<div className="unit">(mm)</div>
							</div>
						</th>
						{precipitation.map((item, index) => (
							<td key={index}>
								<div>{item.value === "강수없음" ? "0" : item.value} </div>
							</td>
						))}
					</tr>
					<tr className="humidity">
						<th>
							<div>
								<div className="category">습도</div>
								<div className="unit">(%)</div>
							</div>
						</th>
						{humidity.map((item, index) => (
							<td key={index}>
								<div>{item.value}</div>
							</td>
						))}
					</tr>
				</TableBody>
			</Table>
		</TableConatiner>
	);
};

export default WeatherChart;
