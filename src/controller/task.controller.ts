import { Request, Response } from "express";
import { createTask, editTask, getTasks } from "../service/task.service";

export async function createTaskHandler(req: Request, res: Response) {
  try {
    const task = await createTask(req.body);
    if (task) {
      res.send(task);
    } else {
      res.send({ message: "Error!" });
    }
  } catch (e: any) {
    res.status(409).send(e.message);
  }
}

export async function getTasksHandler(req: Request, res: Response) {
  try {
    const tasks = { payload: await getTasks() };
    return res.status(200).send(tasks);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export async function editTaskHandler(
  { body, params }: Request,
  res: Response
) {
  try {
    const task = await editTask(params._id, body);
    console.log(task);
    if (task) res.status(200).send(task);
    else res.send({ message: "Update failed!" });
  } catch (e: any) {}
}

export async function deleteTaskHandler(req: any, res: any) {
  try {
    await res?.task.remove();
    res.json({
      message: `User with id ${req.params._id} was deleted successfully!`,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
