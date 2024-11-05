const { getPuppyById, createPuppy, editPuppy } = require("../models/Profile");

exports.getMyPage = async (req, res) => {
  try {
  } catch (error) {}
};

exports.getMyPuppy = async (req, res) => {
  try {
    const userId = req.userId;
    const puppyInfo = await getPuppyById(userId);

    if (!puppyInfo) {
      return res.status(404).json({ message: "강아지 정보가 없습니다." });
    }
    console.log(puppyInfo);
    const myPuppyInfo = {
      dogName: puppyInfo.name,
      size: puppyInfo.size,
      etc: {
        northern: puppyInfo.northern,
        brachycephalic: puppyInfo.brachy,
        seniorOrJunior: puppyInfo.weakness,
      },
    };
    res.status(200).json(myPuppyInfo);
  } catch (error) {
    return res.status(500).json({ message: "서버에 에러가 발생했습니다." });
  }
};

exports.createMyPuppy = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, size, etc } = req.body;

    const existingPuppy = await getPuppyById(userId);
    if (existingPuppy) {
      return res
        .status(400)
        .json({ message: "이미 강아지 정보가 존재합니다." });
    }

    await createPuppy({ userId, name, size, etc });
    return res.status(200).json({ message: "강아지 정보가 생성되었습니다." });
  } catch (error) {
    return res.status(500).json({ message: "서버에 에러가 발생했습니다." });
  }
};

exports.editMyPuppy = async (req, res) => {
  try {
    const userId = req.userId;
    const { dogName, size, etc } = req.body;
    await editPuppy({ userId, name: dogName, size, etc });
    console.log("수정 성공");
    res.status(200).json({ message: "강아지 정보가 수정되었습니다." });
  } catch (error) {}
};
