import express, { Router } from "express";
import {
  changePasswordHandler,
  createSessionHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  signupUserHandler,
} from "../controller/auth.controller";
import authorizeRoles from "../middleware/auth-roles.middleware";
import requireUser from "../middleware/require-user.middleware";

const router: Router = express.Router();

router
  .route("/api/user")
  .post(requireUser, authorizeRoles("Admin"), signupUserHandler);

router.route("/api/logout").get(requireUser, logoutUserHandler);

router.post("/api/session/refresh", refreshAccessTokenHandler);

router
  .route("/api/change-password/:_id")
  .post(requireUser, changePasswordHandler);

router.route("/api/session").post(createSessionHandler);

export { router as authRouter };
