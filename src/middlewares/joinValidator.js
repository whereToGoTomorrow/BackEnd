const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("joi");

const registerValidation = Joi.object({
  phoneNumber: Joi.string().required(),
  id: Joi.string().email().required(),
  password: Joi.string().min(4).trim().required(), //최소 4자이상, 공백제거하고 받음
  confirmPassword: Joi.ref("password").required(),
  nickname: Joi.string().alphanum().min(3).trim().required(), //알파벳or숫자, 최소3자이상, 공백제거하고 받음
});

//회원가입 검증
module.exports = async (req, res, next) => {
  try {
    const { nickname, email, password, confirmPassword } =
      await registerValidation.validateAsync(req.body);

    if (password.includes(nickname)) {
      res.status(400).send({
        errorMessage: "비밀번호는 닉네임이 포함되지 않도록 설정해주세요",
      });
      return;
    }

    if (email === password) {
      res.status(400).send({
        errorMessage: "이메일과 비밀번호는 동일하게 설정할 수 없습니다",
      });
    }
    // 닉네임 중복검사
    const existNick = await User.findOne({ nickname });

    if (existNick) {
      res.status(400).send({
        errorMessage: "닉네임이 중복되었습니다",
      });
      return;
    }

    // 이메일 중복검사
    const existemail = await User.findOne({ email });

    if (existemail) {
      res.status(400).send({
        errorMessage: "이메일이 중복되었습니다",
      });
      return;
    }

    next();
  } catch (err) {
    res.status(401).send({
      errorMessage: "요청한 형식이 올바르지 않습니다",
    });
    return;
  }
};
