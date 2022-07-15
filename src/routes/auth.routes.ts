import express, { Router } from "express";
import {
  changePasswordHandler,
  createSessionHandler,
  forgotPassword,
  logoutUserHandler,
  refreshAccessTokenHandler,
  signupUserHandler,
} from "../controller/auth.controller";

const router: Router = express.Router();

router.route("/api/user").post(signupUserHandler);

router.route("/api/logout").get(logoutUserHandler);

router.post("/api/session/refresh", refreshAccessTokenHandler);

router.route("/api/password/forgot").post(forgotPassword);

router.route("/api/change-password/:_id").post(changePasswordHandler);

router.route("/api/session").post(createSessionHandler);

export { router as authRouter };
