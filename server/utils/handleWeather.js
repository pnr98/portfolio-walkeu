exports.handleWeather = (rawWeather, type) => {
  if (!Array.isArray(rawWeather)) {
    console.log("rawWeather가 배열이 아님");
    return {};
  }
  let weather = {};

  if (type === "now") {
    weather = {
      precipitationForm: [], //PTY 강수형태 1
      humidity: [], //REH 습도 2
      precipitation: [], //RN1 강수량 3
      temperature: [], //T1H 기온 4
      windSpeed: [], //WSD 풍속 8
    };
    rawWeather.forEach((item) => {
      const weatherData = {
        baseDate: item.baseDate,
        baseTime: item.baseTime,
        obsrValue: item.obsrValue,
      };

      switch (item.category) {
        case "PTY":
          weather.precipitationForm = weatherData;
          break;
        case "REH":
          weather.humidity = weatherData;
          break;
        case "RN1":
          weather.precipitation = weatherData;
          break;
        case "T1H":
          weather.temperature = weatherData;
          break;
        case "WSD":
          weather.windSpeed = weatherData;
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
        baseDate: item.baseDate,
        baseTime: item.baseTime,
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
    weather = {
      prcpProbability: [],
      thermoMinimum: [], // TMN 최저기온 (0600)
      thermoMaximum: [], // TMX 최고기온 (1500)
    };
    // 날짜 차이를 계산하는 함수
    const caculateDate = (baseDate, targetDate) => {
      const base = new Date(
        baseDate.slice(0, 4),
        baseDate.slice(4, 6) - 1,
        baseDate.slice(6, 8)
      );
      const target = new Date(
        targetDate.slice(0, 4),
        targetDate.slice(4, 6) - 1,
        targetDate.slice(6, 8)
      );
      const diffTime = target.getTime() - base.getTime();
      return diffTime / (1000 * 60 * 60 * 24); // 일 단위 차이 계산
    };
    // 강수확률만 배열로 묶기
    const diffrentDatePop = [];

    rawWeather.forEach((item) => {
      const weatherData = {
        baseDate: item.baseDate,
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
        fcstValue: item.fcstValue,
      };
      switch (item.category) {
        case "POP": // 강수확률
          diffrentDatePop.push(weatherData);
          break;
        case "TMN": // 일 최저기온(0600)
          weather.thermoMinimum.push(weatherData);
          break;
        case "TMX": // 일 최고기온 (1500)
          weather.thermoMaximum.push(weatherData);
          break;
      }
    });

    const groupedDate = diffrentDatePop.reduce((acc, item) => {
      const { baseDate, fcstDate } = item;
      const dateDiff = caculateDate(baseDate, fcstDate);

      // 날짜 차이에 따라 그룹명 결정
      let groupName;
      if (dateDiff === 0) {
        groupName = "today";
      } else if (dateDiff === 1) {
        groupName = "tomorrow";
      } else if (dateDiff === 2) {
        groupName = "theDayAfterTmrw";
      } else if (dateDiff === 3) {
        groupName = "twoDayAfterTmrw";
      }

      if (groupName) {
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(item);
      }

      return acc;
    }, {});

    // 해당 날짜 중에서 가장 큰 확률
    const highestPopPerGroup = Object.keys(groupedDate).map((group) => {
      const items = groupedDate[group];
      return items.reduce((maxItem, currentItem) => {
        return currentItem.fcstValue > maxItem.fcstValue
          ? currentItem
          : maxItem;
      });
    });
    weather.prcpProbability = highestPopPerGroup;
  }
  return weather;
};
