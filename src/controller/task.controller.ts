import { Request, Response } from "express";
import {
  createTask,
  editTask,
  getTask,
  getTasks,
} from "../service/task.service";

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

export async function getTasksHandler({ params }: Request, res: Response) {
  try {
    let tasks = await getTasks();
    if (tasks)
      tasks = tasks.filter((task) => task.userId.toString() === params._id);
    return res.status(200).send(tasks);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export async function getEmployeeTasksHandler(
  { params }: Request,
  res: Response
) {
  try {
    let tasks = await getTasks();
    if (tasks) tasks = tasks.filter((task) => task.to === params.email);
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
    if (task) res.status(200).send(task);
    else res.send({ message: "Update failed!" });
  } catch (e: any) {}
}

export const getTaskHandler = async ({ params }: Request, res: Response) => {
  const task = await getTask(params._id);
  if (task) res.status(200).send(task);
  else res.send({ message: "Cannot find task!" });
};

export async function deleteTaskHandler(req: any, res: any) {
  try {
    await res?.task.remove();
    res.json({
      message: `Task with id ${req.params._id} was deleted successfully!`,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
