import express, { Request, Response, Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  editTaskHandler,
  getTasksHandler,
} from "../controller/task.controller";
import { findTaskMiddleware } from "../middleware/findTask.middleware";
const router: Router = express.Router();

router.post("/api/task", createTaskHandler);
router.patch("/api/task/:_id", findTaskMiddleware, editTaskHandler);
router.delete("/api/task/:_id", findTaskMiddleware, deleteTaskHandler);

router.get("/api/tasks", [], getTasksHandler);

export { router as taskRouter };
