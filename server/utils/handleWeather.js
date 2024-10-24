exports.handleWeather = (rawWeather, type) => {
  if (!Array.isArray(rawWeather)) {
    console.log("rawWeather가 배열이 아님");
    return {};
  }
  let weather = {};

  if (type === "now") {
    weather = {
      precipitationForm: null, //PTY 강수형태 1
      humidity: null, //REH 습도 2
      precipitation: null, //RN1 강수량 3
      temperature: null, //T1H 기온 4
      windSpeed: null, //WSD 풍속 8
    };
    rawWeather.forEach((item) => {
      switch (item.category) {
        case "PTY":
          weather.precipitationForm = item.obsrValue;
          break;
        case "REH":
          weather.humidity = item.obsrValue;
          break;
        case "RN1":
          weather.precipitation = item.obsrValue;
          break;
        case "T1H":
          weather.temperature = item.obsrValue;
          break;
        case "WSD":
          weather.windSpeed = item.obsrValue;
          break;
      }
    });
  } else if (type === "short") {
    weather = {
      precipitationForm: [], //PTY 강수형태 12
      precipitation: [], //RN1 강수량 18
      skyState: [], //SKY 하늘상태 24
      temperature: [], //T1H 기온 30
      humidity: [], //REH 습도 36
      windSpeed: [], //WSD 풍속 54-60
    };
    rawWeather.forEach((item) => {
      const weatherData = {
        fcstTime: item.fcstTime,
        fcstValue: item.fcstValue,
      };

      switch (item.category) {
        case "PTY":
          weather.precipitationForm.push(weatherData);
          break;
        case "RN1":
          weather.precipitation.push(weatherData);
          break;
        case "SKY":
          weather.skyState.push(weatherData);
          break;
        case "T1H":
          weather.temperature.push(weatherData);
          break;
        case "REH":
          weather.humidity.push(weatherData);
          break;
        case "WSD":
          weather.windSpeed.push(weatherData);
          break;
      }
    });
  } else if (type === "long") {
  } else if (type === "air") {
  }
  return weather;
};
