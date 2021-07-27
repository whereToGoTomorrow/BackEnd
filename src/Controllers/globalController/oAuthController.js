import User from "../../model/User";
import jwt from "jsonwebtoken";
import SECRET_KEY from "../../config/secretKey";

export const oAuth = async (req, res) => {
  const { socialId } = req.body;

  const user = await User.findOne({ socialId });

  if (!user) {
    return res.json({ action: "join" });
  }

  res.json({ nickname: user.nickname });
};

export const oAuthJoin = async (req, res) => {
  const { nickname } = req.body;

  const user = await User.findOne({ nickname });

  if (user) {
    return res.json({ ok: false, error: "이미 존재하는 닉네임입니다." });
  }

  const token = jwt.sign({ nickname: user.nickname }, SECRET_KEY);

  res.json({ ok: true, token });
};
