import express from "express";
import {
  getCate,
  getCourse,
  getResult,
} from "../Controllers/detailControllers/searchResult";

const detailRouter = express.Router();
detailRouter.post("/", getResult);
detailRouter.get("/:contentid", getCourse);
detailRouter.get("/", getCate);
export default detailRouter;
