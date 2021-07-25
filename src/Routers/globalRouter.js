import express from "express";
import { getAllList, getCourseData } from "../Controllers/globalControllers";

const globalRouter = express.Router();

globalRouter.get("/random", getAllList);

globalRouter.get("/detail", getCourseData);

export default globalRouter;
