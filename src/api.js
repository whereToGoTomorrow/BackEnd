import axios from "axios";
import AreaCodes from "./model/AreaCodes";
import Course from "./model/Course";
import DataList from "./model/DataList";
const encodeKey =
  "DbTqTFQ01Byhsb85l08hrTaU8NhtcBaNcLw4Np%2BTT6tUsxKDoIgNxTFqMEH5NBK9NuGYxAgwL6WQf6ODDGBUeg%3D%3D";

const serviceKey = decodeURIComponent(encodeKey);

const api = axios.create({
  baseURL: "http://api.visitkorea.or.kr/openapi/service/rest/KorService",
  params: {
    serviceKey,
    MobileOS: "ETC",
    MobileApp: "init",
  },
});

//지역코드 가져오기
const getLocationCode = async () => {
  const data = await api.get("areaCode", {
    params: {
      numOfRows: 30,
    },
  });
  const {
    data: {
      response: {
        body: {
          items: { item },
        },
      },
    },
  } = data;

  for (let i of item) {
    const { code, name, rnum } = i;
    await AreaCodes.create({ code, name, rnum });
  }
};

getLocationCode();

//지역기반 관광정보 조회 관광코드 25로 각 지역별 코드별 광관지 1 페이지당 20개씩
const getListData = async () => {
  const codes = await AreaCodes.findOne({ code: 1 });

  for (let i of [codes]) {
    const { code } = i;

    const data = await api.get("areaBasedList", {
      params: {
        areaCode: code,
        numOfRows: 2,
        contentTypeId: 25,
      },
    });
    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = data;

    for (let j of item) {
      const {
        addr1,
        areacode,
        cat1,
        cat2,
        cat3,
        contentid,
        contenttypeid,
        createdtime,
        firstimage,
        firstimage2,
        mapx,
        mapy,
        mlevel,
        modifiedtime,
        readcount,
        sigungucode,
        title,
      } = j;

      await DataList.create({
        addr1,
        areacode,
        cat1,
        cat2,
        cat3,
        contentid,
        contenttypeid,
        createdtime,
        firstimage,
        firstimage2,
        mapx,
        mapy,
        mlevel,
        modifiedtime,
        readcount,
        sigungucode,
        title,
      });
    }
  }
};

//지역기반 관광정보 콘텐트 아이디를 이용 해서 코스정보 얻어오기
const getCourse = async () => {
  const tempid = 2044565;
  const lists = await DataList.find({});
  for (let i of [{ contentid: tempid }]) {
    const { contentid } = i;

    const data = await api.get("detailInfo", {
      params: {
        contentId: contentid,
        contentTypeId: 25,
      },
    });

    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = data;

    await Course.create({
      courseid: contentid,
      course: item,
    });
  }
};
