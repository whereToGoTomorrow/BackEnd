import express from "express";
import {} from "../Controllers/globalController/kakaolLogin";
import {} from "../Controllers/globalController/naverLogin";
import { join, login } from "../Controllers/globalController/loginAndJoin";

import joinValidator from "../middlewares/joinValidator";

const globalRouter = express.Router();

globalRouter.post("/join", joinValidator, join);

globalRouter.post("/login", login);

export default globalRouter;
