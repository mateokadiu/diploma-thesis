import express, { Request, Response, Router } from "express";
import { omit } from "lodash";
import {
  deleteUserHandler,
  editUserHandler,
  getPaginatedUsers,
  getUserNumbers,
  getUsersHandler,
} from "../controller/user.controller";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middleware/auth.middleware";
// import { deserializeUser } from "../middleware/deserializeUser";
import { findUserMiddleware } from "../middleware/findUser.middleware";
// import { requireUser } from "../middleware/requireUser";

const router: Router = express.Router();

// router.use(deserializeUser, requireUser);

router.route("/api/users/:role/:email").get([], getUsersHandler);

router.route("/api/users/numbers").get(getUserNumbers);

router.route("/api/user/:_id").delete(findUserMiddleware, deleteUserHandler);

router.route("/api/user/:_id").patch(findUserMiddleware, editUserHandler);
router.route("/api/users").get([], getPaginatedUsers);

export { router as userRouter };
