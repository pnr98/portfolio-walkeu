import React from "react";
import styled from "styled-components";

const TableContainer = styled.div``;
const Table = styled.table`
	display: table;
	width: 100%;
	border-radius: 40px;
	box-shadow: var(--box-shadow);
	border-collapse: collapse;
	color: var(--black-20);
	tr {
		display: table-row;
		:not(:last-child) {
			border-right: 2px solid var(--table-border);
		}
	}
	th {
		text-align: center;
		padding: 20px;
	}
	td {
		text-align: center;
		padding: 20px;
	}
`;
const TableHeader = styled.thead`
	th {
		font-weight: 600;
	}
`;

const TableBody = styled.tbody`
	th {
		font-weight: 600;
	}
	tr {
		&.min {
			td {
				color: var(--grade-blue);
			}
		}
	}
	tr {
		&.max {
			td {
				color: var(--grade-red);
			}
		}
	}
`;
// 당일 오후에는 당일 최저, 최고기온을 제공하지 않음
const WeatherLong = ({ longTerm }) => {
	const { prcpProbability, thermoMaximum, thermoMinimum } = longTerm;

	if (!prcpProbability || !thermoMaximum || !thermoMinimum) {
		return <div>Loading...</div>; // 데이터가 없으면 로딩 표시
	}

	const todayDate = prcpProbability[0]?.baseDate;

	// 날짜 차이 계산
	const calculateDateDiff = (baseDate, targetDate) => {
		const base = new Date(baseDate.slice(0, 4), baseDate.slice(4, 6) - 1, baseDate.slice(6, 8));
		const target = new Date(targetDate.slice(0, 4), targetDate.slice(4, 6) - 1, targetDate.slice(6, 8));
		const diffTime = target.getTime() - base.getTime();
		return diffTime / (1000 * 60 * 60 * 24);
	};

	const getFcstValue = (data, todayDate) => {
		const values = { today: "", tomorrow: "", dayAfterTomorrow: "", twoDaysAfterTomorrow: "" };
		data.forEach((item) => {
			const dateDiff = calculateDateDiff(todayDate, item.fcstDate);
			if (dateDiff === 0) values.today = item.fcstValue || "";
			else if (dateDiff === 1) values.tomorrow = item.fcstValue || "";
			else if (dateDiff === 2) values.dayAfterTomorrow = item.fcstValue || "";
			else if (dateDiff === 3) values.twoDaysAfterTomorrow = item.fcstValue || "";
		});
		return values;
	};

	const prcpValues = getFcstValue(prcpProbability, todayDate);
	const thermoMimValues = getFcstValue(thermoMinimum, todayDate);
	const thermoMaxValues = getFcstValue(thermoMaximum, todayDate);
	console.log(prcpValues);
	return (
		<TableContainer>
			<Table>
				<TableHeader className="day">
					<tr>
						<th></th>
						<th>오늘</th>
						<th>내일</th>
						<th>모레</th>
						<th>글피</th>
					</tr>
				</TableHeader>
				<TableBody>
					<tr className="min">
						<th>최저기온 (°C)</th>
						<td>{thermoMimValues.today}</td>
						<td>{thermoMimValues.tomorrow}</td>
						<td>{thermoMimValues.dayAfterTomorrow}</td>
						<td>{thermoMimValues.twoDaysAfterTomorrow}</td>
					</tr>

					<tr className="max">
						<th>최고기온 (°C)</th>
						<td>{thermoMaxValues.today}</td>
						<td>{thermoMaxValues.tomorrow}</td>
						<td>{thermoMaxValues.dayAfterTomorrow}</td>
						<td>{thermoMaxValues.twoDaysAfterTomorrow}</td>
					</tr>

					<tr className="pop">
						<th>강수확률 (%)</th>
						<td>{prcpValues.today}</td>
						<td>{prcpValues.tomorrow}</td>
						<td>{prcpValues.dayAfterTomorrow}</td>
						<td>{prcpValues.twoDaysAfterTomorrow}</td>
					</tr>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default WeatherLong;
