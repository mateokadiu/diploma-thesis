import express, { Router } from "express";
import {
  changePasswordHandler,
  forgotPassword,
  loginUserHandler,
  logoutUserHandler,
  signupUserHandler,
} from "../controller/auth.controller";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middleware/auth.middleware";

const router: Router = express.Router();

router.route("/api/user").post(signupUserHandler);

router.route("/api/login").post(loginUserHandler);
router.route("/api/logout").get(logoutUserHandler);

router.route("/api/password/forgot").post(forgotPassword);

router.route("/api/change-password/:_id").post(changePasswordHandler);

export { router as authRouter };
