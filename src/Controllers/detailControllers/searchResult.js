import { getWithInKm } from "../../getDistance";
import Course from "../../model/Course";

export const getResult = async (req, res) => {
  try {
    const getParam = req.body;

    for (let i in getParam) {
      if (i === "areaCode") {
        continue;
      }
      if (String(getParam[i]).length <= 0 || String(getParam[i]).length > 20) {
        return res.json({ ok: true, error: "올바른 값을 입력하세요" });
      }
    }

    const { lat, lng, areaCode, contentType } = req.body;
    const data = await getWithInKm(lat, lng, 200, areaCode, contentType);

    return res.json({ ok: true, data });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};

export const getCourse = async (req, res) => {
  const getParam = req.params;

  if (
    !getParam.contentid ||
    String(getParam.contentid).length <= 0 ||
    String(getParam.contentid).length > 20
  ) {
    return res.json({ ok: false, error: "올바른 값을 입력하세요" });
  }

  const { contentid } = req.params;

  try {
    const data = await Course.findOne({ courseid: contentid });

    return res.json({ ok: true, data });
  } catch (e) {
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};

export const getCate = async (req, res) => {
  const getQuery = req.query;
  for (let i in getQuery) {
    if (getQuery[i].length <= 0 || getQuery[i].length > 20) {
      return res.json({ ok: true, error: "올바른 값을 입력하세요" });
    }
  }

  const { lat, lng, areaCode, contentType, cat2 } = req.query;
  const newAreaCode = areaCode.split(",");

  try {
    const data = await getWithInKm(
      lat,
      lng,
      200,
      newAreaCode,
      contentType,
      cat2
    );

    return res.json({ ok: true, data });
  } catch (e) {
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
