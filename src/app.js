require("dotenv").config();
import "./model/db";
import "./api";
import "./getDistance";

import express from "express";
import globalRouter from "./Routers/globalRouter";
import detailRouter from "./Routers/detailRouter";
<<<<<<< HEAD
import oAuthRouter from "./Routers/oAuthRouter";
=======
import authRouter from "./Routers/authRouter";
>>>>>>> fed21e79f233890f736f6c355c897bc5e7df9b7f

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use("/", globalRouter);
app.use("/detail", detailRouter);
<<<<<<< HEAD
app.use("/oAuth", oAuthRouter);

=======
app.use("/auth", authRouter);
>>>>>>> fed21e79f233890f736f6c355c897bc5e7df9b7f
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
