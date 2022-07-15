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
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middleware/auth.middleware";
// import { deserializeUser } from "../middleware/deserializeUser";
import { findUserMiddleware } from "../middleware/findUser.middleware";
// import { requireUser } from "../middleware/requireUser";

const router: Router = express.Router();

// router.use(deserializeUser, requireUser);

router
  .route("/api/users/:role/:email")
  .get(isAuthenticatedUser, [], getUsersHandler);

router
  .route("/api/users/numbers")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), getUserNumbers);

router
  .route("/api/user/:_id")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("Admin"),
    findUserMiddleware,
    deleteUserHandler
  );

router.route("/api/user/:_id").patch(findUserMiddleware, editUserHandler);
router
  .route("/api/users")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), [], getPaginatedUsers);
router.route("/api/users/me").get(getCurrentUserHandler);

export { router as userRouter };
