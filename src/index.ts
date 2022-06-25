import express, { Application } from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { taskRouter } from "./routes/task.routes";
import { authRouter } from "./routes/auth.routes";

const app: Application = express();
app.use(json());
app.use(cors());

app.use([authRouter, userRouter, taskRouter]);

mongoose.connect(
  "mongodb+srv://root:W5z99cWBmU9sDuZ@diploma-thesis.funhwek.mongodb.net/diploma-thesis?tls=true",
  () => {
    console.log("connected to db");
  }
);

app.listen(3000, () => {
  console.log("server is running");
});
