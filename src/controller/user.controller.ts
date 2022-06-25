import { Request, Response } from "express";
import { omit } from "lodash";
import UserModel from "../models/user.model";
import { editUser, getUsers } from "../service/user.service";

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = { payload: await getUsers() };
    return res.status(200).send(users);
  } catch (e: any) {}
}

export async function deleteUserHandler(req: any, res: any) {
  try {
    await res?.user.remove();
    res.json({
      message: `User with id ${req.params._id} was deleted successfully!`,
    });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}

export async function editUserHandler(
  { body, params }: Request,
  res: Response
) {
  try {
    const user = await editUser(params._id, body);
    if (user) {
      res.status(200).send(omit(user, "password"));
    } else {
      res.send({ message: "Update failed!" });
    }
  } catch (e: any) {}
}
