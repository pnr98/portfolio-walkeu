// 위경도 -> 격자 (X, Y)
const lamcproj = (lon, lat, map_params) => {
  const PI = Math.asin(1.0) * 2.0;
  const DEGRAD = PI / 180.0;

  // Lambert Conformal Conic Projection 매개변수 설정
  let re = map_params.Re / map_params.grid;
  let slat1 = map_params.slat1 * DEGRAD;
  let slat2 = map_params.slat2 * DEGRAD;
  let olon = map_params.olon * DEGRAD;
  let olat = map_params.olat * DEGRAD;

  let sn =
    Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);

  let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;

  let ro = Math.tan(PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  // 위경도 -> 격자 (code = 0)
  let ra = Math.tan(PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;

  if (theta > PI) theta -= 2.0 * PI;
  if (theta < -PI) theta += 2.0 * PI;
  theta *= sn;

  const x = ra * Math.sin(theta) + map_params.xo;
  const y = ro - ra * Math.cos(theta) + map_params.yo;

  return { x, y }; //int(x + 1.5), int(y + 1.5)  # Return X, Y grid
};

exports.mapConv = (lon, lat) => {
  const map_params = {
    Re: 6371.00877, // 지도반경
    grid: 5.0, // 격자간격 (km)
    slat1: 30.0, // 표준위도 1
    slat2: 60.0, // 표준위도 2
    olon: 126.0, // 기준점 경도
    olat: 38.0, // 기준점 위도
    xo: 210 / 5.0, // 기준점 X좌표 (grid 값으로 나누기)
    yo: 675 / 5.0, // 기준점 Y좌표 (grid 값으로 나누기)
    first: 0,
  };

  const result = lamcproj(lon, lat, map_params);
  const x = Math.floor(result.x + 1.5); // 격자 X 좌표
  const y = Math.floor(result.y + 1.5); // 격자 Y 좌표

  return { x, y }; // 격자 값을 반환
};
