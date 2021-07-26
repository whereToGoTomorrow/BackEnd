import DataList from "./model/DataList";

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export const getWithInKm = async (
  lat1,
  lng1,
  km,
  areaCode,
  contentType,
  cat2
) => {
  const allData = [];

  for (let i of areaCode) {
    const results = await DataList.find(
      {
        areacode: i,
        contenttypeid: contentType,
        ...(cat2 && { cate2 }),
      },
      {
        _id: 0,
        addr1: 1,
        contentid: 1,
        mapx: 1,
        mapy: 1,
        title: 1,
        overview: 1,
        cat1: 1,
        cat2: 1,
        cat3: 1,
      }
    );
    allData.push(...results);
  }

  const result = [];

  for (let i of allData) {
    const { contentid, mapy, mapx, addr1, title, overview, cat1, cat2, cat3 } =
      i;
    if (!mapx || !mapy) {
      continue;
    }
    const distance = getDistanceFromLatLonInKm(
      lat1,
      lng1,
      Number(mapy),
      Number(mapx)
    );
    if (distance <= km) {
      result.push({
        contentid,
        mapy,
        mapx,
        addr1,
        title,
        overview,
        cat1,
        cat2,
        distance: Math.round(distance),
      });
    }
  }

  return result;
};
