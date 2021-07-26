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
