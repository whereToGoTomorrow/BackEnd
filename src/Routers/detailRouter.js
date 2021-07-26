import express from "express";
import {
  getCourse,
  getResult,
} from "../Controllers/detailControllers/searchResult";

const detailRouter = express.Router();
detailRouter.post("/", getResult);
detailRouter.get("/:contentid", getCourse);
export default detailRouter;
