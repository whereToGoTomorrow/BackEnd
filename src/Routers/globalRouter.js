import express from "express";
import {
  join,
  login,
  authNaver,
  callbackAuthNaver,
} from "../Controllers/globalController/loginAndJoin";
import joinValidator from "../middlewares/joinValidator";

const globalRouter = express.Router();

globalRouter.post("/join", joinValidator, join);

globalRouter.post("/login", login);

globalRouter.post("/oauth/naver", authNaver);

globalRouter.post("/oauth/callback/naver", callbackAuthNaver);

export default globalRouter;
