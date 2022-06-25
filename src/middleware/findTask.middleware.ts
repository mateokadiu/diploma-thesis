import { NextFunction, Request, Response } from "express";
import TaskModel from "../models/task.model";

export async function findTaskMiddleware(
  req: Request,
  res: any,
  next: NextFunction
) {
  let task;

  try {
    task = await TaskModel.findById(req.params._id);
    if (task == null) {
      return res
        .status(404)
        .json({ message: `Cannot find task with id '${req.params._id}'!` });
    }

    res.task = task;
    next();
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
