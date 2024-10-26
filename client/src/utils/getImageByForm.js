export const getImageByForm = (form, nowSkyState, time) => {
	//
	if (time === "daytime") {
		if (form === "없음") {
			switch (nowSkyState) {
				case "맑음":
					return require("../assets/weather-icon/sunny.png"); // night
				case "구름보통":
					return require("../assets/weather-icon/cloud-sunny.png"); // night-cloud
				case "구름많음":
					return require("../assets/weather-icon/cloud-sunny.png"); // night-cloud
				case "흐림":
					return require("../assets/weather-icon/cloud.png");
			}
		} else {
			switch (form) {
				case "비":
					return require("../assets/weather-icon/rain.png");
				case "비/눈":
					return require("../assets/weather-icon/rain-snow.png");
				case "눈":
					return require("../assets/weather-icon/snow.png");
			}
		}
	} else if (time === "night") {
		if (form === "없음") {
			switch (nowSkyState) {
				case "맑음":
					return require("../assets/weather-icon/night.png");
				case "구름보통":
					return require("../assets/weather-icon/night-cloud.png");
				case "구름많음":
					return require("../assets/weather-icon/night-cloud.png");
				case "흐림":
					return require("../assets/weather-icon/cloud.png");
			}
		} else {
			switch (form) {
				case "비":
					return require("../assets/weather-icon/rain.png");
				case "비/눈":
					return require("../assets/weather-icon/rain-snow.png");
				case "눈":
					return require("../assets/weather-icon/snow.png");
			}
		}
	}
};
