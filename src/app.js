require("dotenv").config();
import "./model/db";
import "./api";
import "./getDistance";

import express from "express";
import globalRouter from "./Routers/globalRouter";
import detailRouter from "./Routers/detailRouter";
import oAuthRouter from "./Routers/oAuthRouter";
import authRouter from "./Routers/authRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use("/", globalRouter);
app.use("/detail", detailRouter);
app.use("/oAuth", oAuthRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
