import { DocumentDefinition } from "mongoose";
import TaskModel, { CalendarTaskDocument } from "../models/task.model";
import { omit } from "lodash";

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

export const getTask = async (_id: string) => {
  try {
    const task = await TaskModel.findById(_id);
    return task;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};

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
    return task?.toJSON();
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};
