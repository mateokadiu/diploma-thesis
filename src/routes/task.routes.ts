import express, { Request, Response, Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  getTaskHandler,
  getTasksHandler,
} from "../controller/task.controller";
// import { deserializeUser } from "../middleware/deserializeUser";
import { findTaskMiddleware } from "../middleware/findTask.middleware";
// import { requireUser } from "../middleware/requireUser";
const router: Router = express.Router();

//router.use(deserializeUser, requireUser);

router.post("/api/task", createTaskHandler);
router.get("/api/task/:_id", getTaskHandler);
router.patch("/api/task/:_id", findTaskMiddleware, editTaskHandler);
router.delete("/api/task/:_id", findTaskMiddleware, deleteTaskHandler);

router.get("/api/tasks", [], getTasksHandler);

export { router as taskRouter };
