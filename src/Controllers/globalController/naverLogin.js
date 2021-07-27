import axios from "axios";

export const startNaver = async (req, res) => {
  const config = {
    client_id: process.env.NAVERKEY,
    redirect_uri: "http://localhost:4000/endnaver",
    response_type: "code",
  };
  const makeParams = new URLSearchParams(config).toString();
  const base = "https://nid.naver.com/oauth2.0/authorize";
  res.redirect(`${base}?${makeParams}`);
};

export const endNaver = async (req, res) => {
  try {
    let token = null;
    let userInfo = null;
    const code = req?.query?.code;

    if (!code) {
      return res.json({ ok: false, error: "인증실패" });
    }

    const clientSecret = "hYNdZnGTpF";

    const config = {
      grant_type: "authorization_code",
      client_id: process.env.NAVERKEY,
      client_secret: process.env.NAVERSECRET,
      redirect_uri: "http://localhost:4000/endnaver",
      code: req.query.code,
    };

    const makeParams = new URLSearchParams(config).toString();
    const base = "https://nid.naver.com/oauth2.0/token";

    await axios
      .get(`${base}?${makeParams}`, {
        headers: {
          "X-Naver-Client-Id": process.env.NAVERKEY,
          "X-Naver-Client-Secret": process.env.NAVERSECRET,
        },
      })
      .then((res) => {
        token = res.data.access_token;
      });

    await axios
      .get("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        userInfo = res.data.response;
      })
      .catch((err) => {
        return res.status(401).json({
          ok: false,
          error: "인증실패",
        });
      });

    res.send({ ok: true, userInfo });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
