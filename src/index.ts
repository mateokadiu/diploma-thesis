require("dotenv").config();
import express, { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";
import { authRouter } from "./routes/auth.routes";
import config from "config";

const app: Application = express();
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   err.status = err.status || "error";
//   err.statusCode = err.statusCode || 500;

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });

app.use(json());
app.use(cors());

app.use([authRouter, userRouter, taskRouter]);

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

const port = config.get<number>("port");

app.listen(port, () => {
  console.log("server is running");
});
