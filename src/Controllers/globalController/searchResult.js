export const getResult = (req, res) => {
  try {
    const { distance, lat, lng, areaCode, contentType } = req.body;
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 분의하세요.",
    });
  }
};
