import express, { Request, Response, Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  getEmployeeTasksHandler,
  getTaskHandler,
  getTasksHandler,
} from "../controller/task.controller";
import authorizeRoles from "../middleware/auth-roles.middleware";
import { findTaskMiddleware } from "../middleware/findTask.middleware";
import requireUser from "../middleware/require-user.middleware";
const router: Router = express.Router();

router
  .route("/api/task")
  .post(requireUser, authorizeRoles("Manager"), createTaskHandler);
router.route("/api/task/:_id").get(requireUser, getTaskHandler);
router
  .route("/api/task/:_id")
  .patch(requireUser, findTaskMiddleware, editTaskHandler);
router
  .route("/api/task/:_id")
  .delete(
    requireUser,
    authorizeRoles("Manager"),
    findTaskMiddleware,
    deleteTaskHandler
  );
router.route("/api/tasks/manager/:_id").get(requireUser, [], getTasksHandler);
router
  .route("/api/tasks/employee/:email")
  .get(requireUser, [], getEmployeeTasksHandler);

export { router as taskRouter };
