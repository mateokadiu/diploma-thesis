import express, { Request, Response, Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  getEmployeeTasksHandler,
  getTaskHandler,
  getTasksHandler,
} from "../controller/task.controller";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware";
import { findTaskMiddleware } from "../middleware/findTask.middleware";
const router: Router = express.Router();

//router.use(deserializeUser, requireUser);

router.route("/api/task").post(createTaskHandler);
router.route("/api/task/:_id").get(getTaskHandler);
router.route("/api/task/:_id").patch(findTaskMiddleware, editTaskHandler);
router.route("/api/task/:_id").delete(findTaskMiddleware, deleteTaskHandler);
router.route("/api/tasks/manager/:_id").get([], getTasksHandler);
router.route("/api/tasks/employee/:email").get([], getEmployeeTasksHandler);

export { router as taskRouter };
