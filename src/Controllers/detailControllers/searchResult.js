import { getWithInKm } from "../../getDistance";
import Course from "../../model/Course";

export const getResult = async (req, res) => {
  try {
    const getParam = req.body;

    for (let i in getParam) {
      if (String(getParam[i]).length <= 0 || String(getParam[i]).length > 20) {
        return res.json({ ok: true, error: "올바른 값을 입력하세요" });
      }
    }

    const { distance, lat, lng, areaCode, contentType } = req.body;
    const data = await getWithInKm(lat, lng, distance, areaCode, contentType);

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

  const { cat2 } = req.params;

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
    if (
      !getQuery[i] ||
      String(getQuery[i]).length <= 0 ||
      String(getQuery[i]).length > 20
    ) {
      return res.json({ ok: false, error: "올바른 값을 입력하세요" });
    }
  }

  const { cat2 } = req.query;
  try {
    // 또 거리별로 검색 다 해야되는데.. 좌표 필요하고... 그렇다고 합치자니... 너무 리소스 낭비가 커지고..

    return res.json({ ok: true, data });
  } catch (e) {
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
