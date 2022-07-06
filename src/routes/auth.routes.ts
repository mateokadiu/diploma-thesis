import express, { Router } from "express";
import {
  changePasswordHandler,
  loginUserHandler,
  signupUserHandler,
} from "../controller/auth.controller";

const router: Router = express.Router();

router.get("/", (res: any) => {
  res.status(200).send({ message: "SERVER RUNNING" });
});

router.post("/api/user", signupUserHandler);

router.post("/api/login", loginUserHandler);

router.post("/api/change-password/:_id", changePasswordHandler);

export { router as authRouter };
