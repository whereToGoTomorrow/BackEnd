require("dotenv").config();
import "./model/db";
import "./api";
import "./getDistance";

import express from "express";
import globalRouter from "./Routers/globalRouter";

const app = express();

const PORT = process.env.PORT || 4000;

app.use("/", globalRouter);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
