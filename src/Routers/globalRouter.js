import express from "express";
import { join, login } from "../Controllers/globalController/loginAndJoin";
import { getResult } from "../Controllers/globalController/searchResult";

const globalRouter = express.Router();

globalRouter.post("/detail", getResult);

globalRouter.post("/join", join);

globalRouter.post("/login", login);

export default globalRouter;
