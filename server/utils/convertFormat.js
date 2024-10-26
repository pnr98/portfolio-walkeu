// Sat Oct 26 2024 01:24:29 GMT+0900 (한국 표준시) --> yyyyMMdd
const convertedDate = (now) => {
  return now.toISOString().split("T")[0].replace(/-/g, "");
};
// Sat Oct 26 2024 01:24:29 GMT+0900 (한국 표준시) --> hhmm
const convertedTime = (now) => {
  return now.toTimeString().slice(0, 5).replace(":", "");
};

// 초단기예보 0 === 예보(30분) | 1 === 실황(정시) | 2 === 단기 (3시간 간격 2~23시)
exports.setBaseDateTime = (code) => {
  const now = new Date();
  //2024-10-26T02:40:27.293Z (UTC)

  let baseDate;
  let baseTime;

  const hours = now.getHours();
  const minutes = now.getMinutes();

  const localeDate = new Date().toLocaleString().slice(0, 10); // 10/26/2024
  const [month, day, year] = localeDate.split("/");

  baseDate = `${year}${month}${day}`;

  if (code === 0) {
    // 초단기예보
    if (minutes < 45) {
      if (hours === 0) {
        now.setDate(now.getDate() - 1);
        baseDate = convertedDate(now);
        baseTime = "2330";
      } else {
        now.setHours(hours - 1, 30, 0); // 1시간 전의 30분으로 설정
        baseTime = convertedTime(now);
      }
    } else {
      now.setHours(hours, 30, 0);
      baseTime = convertedTime(now);
    }
  } else if (code === 1) {
    // 초단기실황
    if (minutes < 10) {
      if (hours === 0) {
        now.setDate(now.getDate() - 1);
        baseDate = convertedDate(now);
        baseTime = "2300";
      } else {
        now.setHours(hours - 1, 0, 0); // 1시간 전의 정각으로 설정
        baseTime = convertedTime(now);
      }
    } else {
      now.setHours(hours, 0, 0);
      baseTime = convertedTime(now);
    }
  } else if (code === 2) {
    // 단기예보 / 2 5 8 11 14 17 20 23 (8회) 10분단위
    const requestHours = [2, 5, 8, 11, 14, 17, 20, 23];
    // 23시11분, 0, 1, 2시9분 일경우 --> 전날 23시
    if (hours === 0 || hours === 1 || (hours === 2 && minutes < 10)) {
      now.setDate(now.getDate() - 1);
      baseDate = convertedDate(now);
      baseTime = "2300";
    } else if (hours === 23 && minutes >= 10) {
      baseTime = "2300";
    } else {
      let closetHour = null;
      for (let hour of requestHours) {
        if (
          hours - hour === 2 ||
          hours - hour === 1 ||
          (hours - hour === 3 && minutes < 10) ||
          (hours - hour === 0 && minutes >= 10)
        ) {
          closetHour = hour;
          break;
        }
      }
      if (closetHour !== null) {
        baseTime = closetHour < 10 ? `0${closetHour}00` : `${closetHour}00`;
      }
    }
  }
  return { baseDate, baseTime };
};
