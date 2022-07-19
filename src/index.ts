require("dotenv").config();
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";
import { authRouter } from "./routes/auth.routes";
import config from "config";
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deserializeUser";

const app: Application = express();

app.use(json());
app.use(cookieParser());
app.use(cors());
app.use(deserializeUser);

mongoose.connect(
  `mongodb+srv://${config.get<string>("dbUsername")}:${config.get<string>(
    "dbPassword"
  )}@diploma-thesis.funhwek.mongodb.net/${config.get<string>(
    "dbName"
  )}?tls=true`,
  () => {
    console.log("connected to db");
  }
);

app.use([authRouter, userRouter, taskRouter]);

const port = config.get<number>("port") || 3000;

app.listen(port, () => {
  console.log("server is running");
});
