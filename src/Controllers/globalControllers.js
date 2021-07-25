import Course from "../model/Course";
import DataList from "../model/DataList";

export const getAllList = async (req, res) => {
  const { areacode } = req.query;
  try {
    const data = await DataList.find({ areacode });
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

  try {
    const data = await Course.find({ courseid });
    return res.json({ ok: true, data: data[0] });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
