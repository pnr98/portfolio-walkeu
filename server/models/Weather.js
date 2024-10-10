// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const WeatherSchema = new Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   shortTermForecast: {
//     // 초단기예보 (6시간)
//     type: [
//       {
//         time: {
//           // 시간 (예: 12:00)
//           type: String,
//           required: true,
//         },
//         weatherCondition: {
//           // 날씨 상태 (눈, 비, 흐림, 맑음 등)
//           type: String,
//           required: true,
//         },
//         temporature: {
//           // 기온
//           type: Number,
//           required: true,
//         },
//         airQuality: {
//           // 대기질
//           type: Number,
//           required: true,
//         },
//         precipitation: {
//           // 강수량
//           type: Number,
//           required: true,
//         },
//         rainChance: {
//           // 강수 확률
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//   },
//   longTermForecast: {
//     // 단기예보 (일주일)
//     type: [
//       {
//         day: {
//           // 시간 (예: 2024-10-05)
//           type: String,
//           required: true,
//         },
//         weatherCondition: {
//           // 날씨 상태 (눈, 비, 흐림, 맑음 등)
//           type: String,
//           required: true,
//         },
//         temporature: {
//           // 기온
//           type: Number,
//           required: true,
//         },
//         airQuality: {
//           // 대기질
//           type: Number,
//           required: true,
//         },
//         precipitation: {
//           // 강수량
//           type: Number,
//           required: true,
//         },
//         rainChance: {
//           // 강수 확률
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//   },
// });

// const Weather = mongoose.model("weather", WeatherSchema);

// module.exports = Weather;
