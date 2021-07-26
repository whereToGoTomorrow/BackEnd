const User = require("../models/user");
const Joi = require("joi");

const joinValidation = Joi.object({
  phoneNumber: Joi.string().required(),
  id: Joi.string().email().required(),
  password: Joi.string().min(4).trim().required(), //최소 4자이상, 공백제거하고 받음
  confirmPassword: Joi.ref("password").required(),
  nickname: Joi.string().alphanum().min(3).trim().required(), //알파벳or숫자, 최소3자이상, 공백제거하고 받음
});

//회원가입 검증
module.exports = async (req, res, next) => {
  try {
    const { phoneNumber, id, password, nickname } =
      await joinValidation.validateAsync(req.body);

    if (password.includes(nickname)) {
      res.status(400).send({
        errorMessage: "비밀번호에 닉네임이 포함되지 않도록 설정해주세요.",
      });
      return;
    }

    // 닉네임 중복검사
    const isThisNicknameExist = await User.findOne({ nickname });

    if (isThisNicknameExist) {
      res.status(400).send({
        errorMessage: "이미 존재하는 닉네임입니다.",
      });
      return;
    }

    // 아이디 중복검사
    const isThisIdExist = await User.findOne({ id });

    if (isThisIdExist) {
      res.status(400).send({
        errorMessage: "이미 존재하는 아이디입니다.",
      });
      return;
    }

    next();
  } catch (err) {
    res.status(400).send({
      errorMessage: "요청한 형식이 올바르지 않습니다.",
    });
    return;
  }
};
