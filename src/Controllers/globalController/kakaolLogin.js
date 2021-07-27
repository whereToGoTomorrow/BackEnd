import axios from "axios";

export const startKakao = async (req, res) => {
  const config = {
    client_id: process.env.KAKAOKEY,
    redirect_uri: "http://localhost:4000/endkakao",
    response_type: "code",
  };
  const makeParams = new URLSearchParams(config).toString();
  const base = "https://kauth.kakao.com/oauth/authorize";
  return res.redirect(`${base}?${makeParams}`);
};

export const endKakao = async (req, res) => {
  const code = req?.query?.code;

  if (!code) {
    return res.json({ ok: false, error: "인증실패" });
  }

  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAOKEY,
    redirect_uri: "http://localhost:4000/endkakao",
    code: req.query.code,
  };

  const makeParams = new URLSearchParams(config).toString();
  const base = "https://kauth.kakao.com/oauth/token";

  const key = await axios.post(`${base}?${makeParams}`, {
    Headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  const token = key?.data?.access_token;

  if (!token) {
    return res.json({ ok: false, error: "인증실패" });
  }

  const anotherBase = "https://kapi.kakao.com/v2/user/me";
  const result = await axios({
    method: "GET",
    url: anotherBase,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userProfile = result?.data;

  if (!userProfile) {
    return res.json({ ok: false, error: "인증실패" });
  }

  const {
    id: kakaoId,
    kakao_account: { email },
    is_email_verified,
    is_email_valid,
  } = userProfile;

  console.log(userProfile);

  // 유저 정보 같이 모델 만들기 추가 해야 할것 3개
  // isSocial:boolean
  // kakaoid,
  // naverid

  return res.end();
};
