export const formatTime = (fcstTime) => {
	let hour = parseInt(fcstTime.substring(0, 2), 10);

	if (hour === 0) {
		// 자정
		return "오전 12시";
	} else if (hour > 12) {
		return `오후 ${hour - 12}시`;
	} else {
		return `오전 ${hour}시`;
	}
};
// 하늘 상태
export const formatSkyState = (fcstValue) => {
	if (fcstValue === 1) {
		return "맑음";
	} else if (fcstValue === 2) {
		return "구름보통";
	} else if (fcstValue === 3) {
		return "구름많음";
	} else if (fcstValue === 4) {
		return "흐림";
	}
};
// 강수 형태
export const formatPrepcipitationForm = (fcstValue) => {
	if (fcstValue === 0) {
		return "없음";
	} else if (fcstValue === 1 || fcstValue === 5) {
		return "비";
	} else if (fcstValue === 2 || fcstValue === 6) {
		return "비/눈";
	} else if (fcstValue === 3 || fcstValue === 7) {
		return "눈";
	}
	// else if (fcstValue === 5) {
	// 	return "빗방울";
	// } else if (fcstValue === 6) {
	// 	return "빗방울눈날림";
	// } else if (fcstValue === 7) {
	// 	return "눈날림";
	// }
};
// 강수량
export const formatprecipitation = (fcstValue) => {
	if (fcstValue === "강수없음" || fcstValue === 0) {
		return "강수없음";
	} else if (fcstValue < 1.0) {
		return "1.0mm 미만";
	} else if (fcstValue >= 1.0 && fcstValue < 50.0) {
		return `${fcstValue}mm`;
	} else if (fcstValue >= 50.0) {
		return "50mm 이상";
	}

	// else if (fcstValue >= 1.0 && fcstValue < 30.0) {
	// 	return "1.0~29.0mm";
	// } else if (fcstValue >= 30.0 && fcstValue < 50.0) {
	// 	return "30.0~50.0mm";
	// }
};
// 초단기실황
export const formatPrepcipitationFormForLong = (fcstValue) => {
	if (fcstValue === 0) {
		return "없음";
	} else if (fcstValue === 1) {
		return "비";
	} else if (fcstValue === 2) {
		return "비/눈";
	} else if (fcstValue === 3) {
		return "눈";
	} else if (fcstValue === 4) {
		return "소나기";
	}
};
// 풍속
export const formatWindSpeed = (fcstValue) => {
	let grade;
	let text;

	if (fcstValue < 4) {
		text = "약함";
		grade = 1;
	} else if (fcstValue >= 4 && fcstValue < 9) {
		text = "약간 강함";
		grade = 2;
	} else if (fcstValue >= 9 && fcstValue < 14) {
		text = "강함";
		grade = 3;
	} else if (fcstValue >= 14) {
		text = "매우 강함";
		grade = 4;
	}

	return { grade, text };
};
// 기온
export const formatThermo = (fcstValue) => {
	let grade;
	let text;

	if (fcstValue >= 27) {
		text = "더움";
		grade = 1;
	} else if (fcstValue >= 20 && fcstValue < 27) {
		text = "포근";
		grade = 2;
	} else if (fcstValue >= 7 && fcstValue < 20) {
		text = "쌀쌀";
		grade = 3;
	} else if (fcstValue < 7) {
		text = "추움";
		grade = 4;
	}
	return { grade, text };
};
// 대기질
export const formatAirQuality = (fcstValue) => {
	let grade;
	let text;
	// {
	// 	khaiValue
	//khaiGrade
	// }

	if (fcstValue === 1) {
		text = "좋음";
		grade = 1;
	} else if (fcstValue === 2) {
		text = "보통";
		grade = 2;
	} else if (fcstValue === 3) {
		text = "나쁨";
		grade = 3;
	} else if (fcstValue === 4) {
		text = "매우 나쁨";
		grade = 4;
	}
	return { grade, text };
};
export const recommandWalk = (size, type, thermo, weather) => {
	let score = 0;

	if (thermo <= 7) {
		// 기온이 적은데 비가오면,
		if (weather === "비") {
			score += 2;
		}
		if (type === "북방견") {
			score -= 1;
		}
	} else if (thermo >= 21) {
		// 기온이 높은데 비가오면
		if (weather === "비") {
			score -= 1;
		}
		if (type === "북방견") {
			score += 1;
		}
	}
	// small
	if (size === "small") {
		if (thermo >= 32) {
			score += 5;
		} else if (thermo >= 29 && thermo < 32) {
			score += 4;
		} else if (thermo >= 23 && thermo < 29) {
			score += 3;
		} else if (thermo >= 21 && thermo < 23) {
			score += 2;
		} else if (thermo >= 13 && thermo < 21) {
			score += 1;
		} else if (thermo >= 7 && thermo < 13) {
			score += 2;
		} else if (thermo >= -1 && thermo < 7) {
			score += 3;
		} else if (thermo >= -4 && thermo < -1) {
			score += 4;
		} else if (thermo < -4) {
			score += 5;
		}
	} else if (size === "middle") {
		if (thermo >= 32) {
			score += 5;
		} else if (thermo >= 29 && thermo < 32) {
			score += 4;
		} else if (thermo >= 23 && thermo < 29) {
			score += 3;
		} else if (thermo >= 21 && thermo < 23) {
			score += 2;
		} else if (thermo >= 13 && thermo < 21) {
			score += 1;
		} else if (thermo >= 7 && thermo < 10) {
			score += 2;
		} else if (thermo >= -1 && thermo < 7) {
			score += 3;
		} else if (thermo >= -9 && thermo < -1) {
			score += 4;
		} else if (thermo < -9) {
			score += 5;
		}
	} else if (size === "big") {
		if (thermo >= 29) {
			score += 5;
		} else if (thermo >= 24 && thermo < 29) {
			score += 4;
		} else if (thermo >= 21 && thermo < 24) {
			score += 3;
		} else if (thermo >= 18 && thermo < 21) {
			score += 2;
		} else if (thermo >= 7 && thermo < 18) {
			score += 1;
		} else if (thermo >= 4 && thermo < 7) {
			score += 2;
		} else if (thermo >= -7 && thermo < 4) {
			score += 3;
		} else if (thermo >= -9 && thermo < -7) {
			score += 4;
		} else if (thermo < -9) {
			score += 5;
		}
	}

	if (score <= 1) {
		return "산책하기 딱 좋은 날이예요";
	} else if (score === 2) {
		return "산책하기 괜찮은 날이예요.";
	} else if (score === 3) {
		return "품종에 따라 주의가 필요 (방한용품)";
	} else if (score === 4) {
		return "산책하기에는 상당히 쌀쌀해요 (방한용품)";
	} else if (score >= 5) {
		return "경고! 산책하기 너무 추움 (방한용품)";
	}
};
