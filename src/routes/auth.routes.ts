import express, { Router } from "express";
import {
  changePasswordHandler,
  loginUserHandler,
  signupUserHandler,
} from "../controller/auth.controller";

const router: Router = express.Router();

router.post("/api/user", signupUserHandler);

router.post("/api/login", loginUserHandler);

router.post("/api/change-password/:_id", changePasswordHandler);

export { router as authRouter };
