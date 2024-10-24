// YYYY-MM-DD 형식
exports.convertFormat = (date) => {
  console.log(date);
  const result = date.map((el) => ({
    ...el,
    walkDate: el.walkDate.toISOString().split("T")[0],
  }));
  return result;
};
// yyyyMMdd
const convertedDate = (today) => {
  const year = today.getFullYear();
  const month = "0" + (today.getMonth() + 1).slice(-2);
  const day = "0" + today.getMonth().slice(-2);
  return `${year}${month}${day}`;
};
// hhmmss
const convertedTime = (today) => {
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const seconds = ("0" + today.getSeconds()).slice(-2);
  return `${hours}${minutes}${seconds}`;
};

// 초단기예보 0 === 예보 | 1 === 실황
exports.setBaseDateTime = (code) => {
  const now = new Date();
  let baseDate;
  let baseTime;

  const hours = now.getHours();
  const minutes = now.getMinutes();

  baseDate = now.toISOString().split("T")[0].replace(/-/g, "");

  if (code === 0) {
    // 초단기예보
    if (minutes <= 45) {
      if (hours == 0) {
        now.setDate(now.getDate() - 1); // 전날
        baseTime = "2330";
      } else {
        now.setHours(hours - 1, 30, 0); // 1시간 전의 30분으로 설정
        baseTime = now.toTimeString().slice(0, 5).replace(":", "");
      }
    } else {
      baseTime = now.toTimeString().slice(0, 5).replace(":", "");
    }
  } else if (code === 1) {
    // 초단기실황
    if (minutes <= 10) {
      if (hours === 0) {
        now.setDate(now.getDate() - 1); // 전날
        baseTime = "2300";
      } else {
        now.setHours(hours - 1, 0, 0); // 1시간 전의 정각으로 설정
        baseTime = now.toTimeString().slice(0, 5).replace(":", "");
      }
    } else {
      baseTime = now.toTimeString().slice(0, 5).replace(":", "");
    }
  } else if (code === 2) {
    // 단기예보
    if (minutes <= 10) {
      if (hours === 0) {
        now.setDate(now.getDate() - 1); // 전날
        baseTime = "2300";
      } else {
        now.setHours(hours - 1, 0, 0); // 1시간 전의 정각으로 설정
        baseTime = now.toTimeString().slice(0, 5).replace(":", "");
      }
    } else {
      baseTime = now.toTimeString().slice(0, 5).replace(":", "");
    }
  }
  return { baseDate, baseTime };
};
