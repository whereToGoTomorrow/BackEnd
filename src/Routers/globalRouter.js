import express from "express";
import {
  endKakao,
  startKakao,
  getinfo,
} from "../Controllers/globalController/kakaolLogin";
import {
  startNaver,
  endNaver,
} from "../Controllers/globalController/naverLogin";
import { join, login } from "../Controllers/globalController/loginAndJoin";

import joinValidator from "../middlewares/joinValidator";

const globalRouter = express.Router();

globalRouter.post("/join", joinValidator, join);

globalRouter.post("/login", login);

globalRouter.get("/startnaver", startNaver);
globalRouter.get("/endnaver", endNaver);

globalRouter.get("/startkakao", startKakao);
globalRouter.get("/endkakao", endKakao);

export default globalRouter;
