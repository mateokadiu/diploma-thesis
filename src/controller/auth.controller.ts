import bcrypt from "bcrypt";
import e, { Request, Response } from "express";
import { omit } from "lodash";
import { signupUser, loginUser, changePassword } from "../service/auth.service";
import { getUser } from "../service/user.service";

export async function signupUserHandler({ body }: Request, res: Response) {
  try {
    const user = await signupUser(body);
    if (user.message) {
      res.status(409).send(user);
    } else if (user) {
      res.send(user);
    }
  } catch (e: any) {
    res.status(409).send(e.message);
  }
}

export async function changePasswordHandler(
  { body, params }: Request,
  res: Response
) {
  const user = await getUser(params?._id);

  const validPassword =
    user && (await user.comparePasswords(user?.password, body?.password));

  if (validPassword) {
    const updated = await changePassword(params._id, body.newPassword);
    if (updated?.email) {
      res.status(200).send({ message: "User password updated successfully!" });
    }
  } else {
    res.status(409).send({ message: "Check your password!" });
  }
}

export async function loginUserHandler({ body }: Request, res: Response) {
  try {
    const user = await loginUser(body);

    const validPassword =
      user && (await bcrypt.compare(body.password, user!.password));

    if (validPassword) {
      res.status(200).json(omit(user.toJSON(), "password"));
    } else {
      res.status(400).json({ message: "Invalid email or password!" });
    }
  } catch (e: any) {
    res.status(500).json({ message: "Server is not responding!" });
  }
}
