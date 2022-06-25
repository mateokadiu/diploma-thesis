import { DocumentDefinition } from "mongoose";
import TaskModel, { CalendarTaskDocument } from "../models/task.model";

export async function createTask(
  input: DocumentDefinition<CalendarTaskDocument>
) {
  try {
    const task = await TaskModel.create(input);
    return task.toJSON();
  } catch (e: any) {
    return { message: "Task not created!" };
  }
}

export const getTasks = async () => {
  try {
    const tasks = await TaskModel.find();
    return tasks;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};

export const editTask = async (_id: string, data: any) => {
  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: "after" }
    );
    console.log("da", task);
    return task?.toJSON();
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};
