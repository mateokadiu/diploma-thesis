import express, { Request, Response, Router } from "express";
import { omit } from "lodash";
import { getCurrentUserHandler } from "../controller/auth.controller";
import {
  deleteUserHandler,
  editUserHandler,
  getPaginatedUsers,
  getUserNumbers,
  getUsersHandler,
} from "../controller/user.controller";
import authorizeRoles from "../middleware/auth-roles.middleware";
import { findUserMiddleware } from "../middleware/findUser.middleware";
import requireUser from "../middleware/require-user.middleware";
const router: Router = express.Router();

router.route("/api/users/:role/:email").get(requireUser, [], getUsersHandler);

router
  .route("/api/users/numbers")
  .get(requireUser, authorizeRoles("Admin"), getUserNumbers);

router
  .route("/api/user/:_id")
  .delete(
    requireUser,
    authorizeRoles("Admin"),
    findUserMiddleware,
    deleteUserHandler
  );

router
  .route("/api/user/:_id")
  .patch(requireUser, findUserMiddleware, editUserHandler);
router.route("/api/users").get(requireUser, [], getPaginatedUsers);
router.route("/api/users/me").get(requireUser, getCurrentUserHandler);

export { router as userRouter };
