import express from "express";
import {
  oAuth,
  oAuthJoin,
} from "../Controllers/globalController/oAuthController";

const oAuthRouter = express.Router();

oAuthRouter.post("/", oAuth);

oAuthRouter.post("/join", oAuthJoin);

export default oAuthRouter;
