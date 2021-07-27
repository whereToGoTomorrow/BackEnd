import express from "express";
import {
  changePassword,
  findPassword,
} from "../Controllers/authControllers/password";

const authRouter = express.Router();
authRouter.post("/password", findPassword);
authRouter.post("/changepassword", changePassword);

export default authRouter;
