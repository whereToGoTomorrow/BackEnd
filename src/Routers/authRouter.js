import express from "express";
import { findPassword } from "../Controllers/authControllers/passwordFind";

const authRouter = express.Router();
authRouter.post("/", findPassword);

export default authRouter;
