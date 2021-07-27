import { SHA256 } from "crypto-js";
import user from "../../model/user";
import { sendMail } from "../../sendMail";

export const findPassword = async (req, res) => {
  const getBody = req.body;

  for (let i in getBody) {
    if (String(getBody[i]).length <= 0 || String(getBody[i]).length >= 25) {
      return res.json({ ok: false, error: "올바른 값을 입력하세요." });
    }
  }

  const { id } = req.body;

  try {
    const exist = await user.findOne({ id });
    if (!exist) {
      return res.json({ ok: false, error: "계정이 존재하지 않습니다." });
    }

    const randomKey = Math.floor(Math.random() * 100);
    const newPassword = SHA256(randomKey).toString();
    const password = SHA256(newPassword).toString();

    await user.updateOne({ id }, { $set: { password } });
    sendMail(id, newPassword);
    return res.json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};

export const changePassword = async (req, res) => {
  const getBody = req.body;

  for (let i in getBody) {
    if (i === "newPassword") {
      if (getBody[i].length < 8) {
        return res.json({ ok: false, error: "요청한 형식에 맞지 않습니다." });
      }
    }
    if (String(getBody[i]).length <= 0 || String(getBody[i]).length >= 100) {
      return res.json({ ok: false, error: "올바른 값을 입력하세요." });
    }
  }

  const { id, newPassword, previousPassword } = req.body;
  const encryptedPassword = SHA256(previousPassword).toString();
  try {
    const exist = await user.exists({ id, password: encryptedPassword });
    if (!exist) {
      return res.json({
        ok: false,
        error: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
    }

    const password = SHA256(newPassword).toString();
    await user.updateOne({ id }, { $set: { password } });

    return res.json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.json({
      ok: false,
      error: "알수없는 오류가 발생했습니다 관리자에게 문의하세요.",
    });
  }
};
