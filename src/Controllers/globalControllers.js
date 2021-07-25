import { getWithInKm } from "../getDistance";
import Course from "../model/Course";

export const getAllList = async (req, res) => {
  const { lat, lng, distance } = req.query;
  const array = [lat, lng, distance];

  for (let item of array) {
    if (typeof item !== "string") {
      return res.json({ ok: false, error: "올바른 값을 입력하세요" });
    }

    if (!item || String(item).length === 0) {
      return res.json({ ok: false, error: "올바른 값을 입력하세요." });
    }
  }

  try {
    const data = await getWithInKm(lat, lng, distance);
    return res.json({ ok: true, data });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};

export const getCourseData = async (req, res) => {
  const { courseid } = req.query;
  if (typeof courseid !== "string") {
    return res.json({ ok: false, error: "올바른 값을 입력하세요" });
  }

  if (!item || String(item).length === 0) {
    return res.json({ ok: false, error: "올바른 값을 입력하세요." });
  }
  try {
    const data = await Course.find({ courseid });
    return res.json({ ok: true, data });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
