// YYYY-MM-DD 형식
exports.convertFormat = (date) => {
  console.log(date);
  const result = date.map((el) => ({
    ...el,
    walkDate: el.walkDate.toISOString().split("T")[0],
  }));
  return result;
};
