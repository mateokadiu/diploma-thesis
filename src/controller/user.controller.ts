import { Request, Response } from "express";
import { omit } from "lodash";
import { editUser, getUsers } from "../service/user.service";

export async function getUsersHandler({ params }: Request, res: Response) {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (e: any) {}
}

export async function getPaginatedUsers(
  { params, query }: Request,
  res: Response
) {
  let users: any = await getUsers();

  const queryParams = query;
  const filter = queryParams?.filter || "",
    userId = queryParams?._id,
    sortOrder = queryParams?.sortOrder,
    pageNumber = parseInt(queryParams?.pageNumber as string),
    pageSize = parseInt(queryParams?.pageSize as string);
  const initialPos = pageNumber * pageSize;

  const usersPage = users
    .filter((u: any) => u?._id.toString() !== userId)
    .slice(initialPos, initialPos + pageSize);

  res.status(200).json(usersPage);
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
