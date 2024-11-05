const Walk = require("../models/Walk");
const { verifyToken } = require("../utils/tokenUtil");

// 산책 기록 불러오기
exports.fetchWalk = async (req, res) => {
  try {
    const userId = req.userId;
    const { date } = req.query; // 2024-10

    if (!date) {
      return res.status(400).json({ message: "날짜가 필요합니다." });
    }
    const dateList = await Walk.getWalkRecordById({ userId, date });
    // console.log("dateList", dateList); // { walkDate: 2024-09-10T15:00:00.000Z },
    // console.log(convertFormat(dateList)); // { walkDate: '2024-09-10' },
    console.log("불러오기 성공");
    res.status(200).json({ dateList: dateList });
  } catch (err) {
    res.status(500).json({
      message: "산책 기록을 불러오는데 실패했습니다.",
    });
  }
};
// 산책 기록 추가
exports.addWalk = async (req, res) => {
  try {
    const userId = req.userId;
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({ message: "날짜가 필요합니다." });
    }

    const existingDate = await Walk.fideOne({ userId, date });
    // 기존 산책 기록이 있는 경우
    if (existingDate?.length > 0) {
      return res
        .status(409)
        .json({ message: "이미 해당 날짜에 산책 기록이 존재합니다." });
    }

    await Walk.addWalkDate({ userId, date });
    console.log("추가 성공");
    res.status(201).json({ message: "산책 기록 추가에 성공했습니다." });
  } catch (err) {
    res.status(500).json({ message: "산책 기록 추가에 실패했습니다" });
  }
};
// 산책 기록 삭제
exports.deleteWalk = async (req, res) => {
  try {
    const userId = req.userId;
    const { date } = req.params; // URL 파라미터에서 날짜 받기
    if (!date) {
      return res.status(400).json({ message: "날짜가 필요합니다." });
    }

    const deletedDate = await Walk.deleteWalkDate({ userId, date });
    if (!deletedDate) {
      return res.status(404).json({ message: "산책 기록이 없습니다." });
    }
    console.log("삭제 성공");
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "산책 기록 삭제에 실패했습니다" });
  }
};
