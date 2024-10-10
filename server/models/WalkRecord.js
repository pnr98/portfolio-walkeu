// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const WalkRecordSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   date: {
//     // 날짜 정보 like 달력
//     type: Date,
//     required: true,
//     unique: true, // 같은 날에 중복 기록을 방지하기 위해
//   },
//   duration: {
//     // 산책 시간 (분)
//     type: Number,
//   },
//   distance: {
//     // 산책 기록 (킬로미터)
//     type: Number,
//   },
//   note: {
//     // 메모
//     type: String,
//   },
// });

// const WalkRecord = moongse.model("walkRecord", WalkRecordSchema);

// module.exports = WalkRecord;
