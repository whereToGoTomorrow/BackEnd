import express from "express";
import { join, login } from "../Controllers/globalController/loginAndJoin";

const globalRouter = express.Router();

globalRouter.post("/join", join);

globalRouter.post("/login", login);

export default globalRouter;
