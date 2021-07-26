import axios from "axios";
import AreaCodes from "./model/AreaCodes";
import Course from "./model/Course";
import DataList from "./model/DataList";
// const encodeKey =
//   "DbTqTFQ01Byhsb85l08hrTaU8NhtcBaNcLw4Np%2BTT6tUsxKDoIgNxTFqMEH5NBK9NuGYxAgwL6WQf6ODDGBUeg%3D%3D";

const encodeKey =
  "R1YkIepzkxhj6Ouue%2Fo0BcyXRM89NzjOU2baG8hXDjqv7MyVSxspxUBLzUZOJPISnGgxDg8SaIutpCmhB7OE%2Fg%3D%3D";

const serviceKey = decodeURIComponent(encodeKey);

const api = axios.create({
  baseURL: "http://api.visitkorea.or.kr/openapi/service/rest/KorService",
  params: {
    serviceKey,
    MobileOS: "ETC",
    MobileApp: "init",
  },
});

//지역코드 가져오기(테스트 완료 실행만 하면 db에 자동으로 들어감)
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

//지역기반 관광정보 조회 관광코드 25로 각 지역별 코드별 광관지 1 페이지당 20개씩(테스트 완료)
const getListData = async () => {
  const codes = await AreaCodes.find({});

  for (let i of codes) {
    const { code } = i;

    const data = await api.get("areaBasedList", {
      params: {
        areaCode: code,
        numOfRows: 20,
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
      //contentid가 있을경우 반복하지 않도록 코드추가
      const exist = await DataList.exists({ contentid: j.contentId });
      if (exist) {
        continue;
      }

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

const getOverView = async (contentId) => {
  const data = await api.get("detailCommon", {
    params: {
      contentId: contentId,
      overviewYN: "Y",
    },
  });
  const {
    data: {
      response: {
        body: {
          items: {
            item: { overview },
          },
        },
      },
    },
  } = data;
  return overview;
};

//지역기반 관광정보 콘텐트 아이디를 이용 해서 코스정보 얻어오기(수정해야됨 작동은되나 db출력상태가 이상함) /받다가 끊김
//위에 추가한 코드를 바탕으로 다시 테스트 필요
const getCourse = async () => {
  const lists = await DataList.find({});
  for (let i of lists) {
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

    const overview = await getOverView(contentid);
    await DataList.findOneAndUpdate({ contentid }, { $set: { overview } });
  }
};

const getCommonDetail = async () => {
  const lists = await DataList.find({});
  for (let i of lists) {
    const { contentid } = i;

    const data = await api.get("detailCommon", {
      params: {
        contentId: contentid,
        overviewYN: "Y",
        mapinfoYN: "Y",
        addrinfoYN: "Y",
        catcodeYN: "Y",
        areacodeYN: "Y",
        firstImageYN: "Y",
        defaultYN: "Y",
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

    await Course.findOneAndUpdate(
      { courseid: contentid },
      { $set: { commonDetail: item } }
    );
  }
};

const getIntroduceDetail = async () => {
  const lists = await DataList.find({});
  for (let i of lists) {
    const { contentid } = i;

    const data = await api.get("detailIntro", {
      params: {
        contentTypeId: 25,
        contentId: contentid,
        introYN: "Y",
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

    await Course.findOneAndUpdate(
      { courseid: contentid },
      { $set: { introduceDetail: item } }
    );
  }
};
