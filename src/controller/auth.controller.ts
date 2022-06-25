import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { omit } from "lodash";
import { signupUser, loginUser } from "../service/auth.service";

export async function signupUserHandler(req: Request, res: Response) {
  try {
    const user = await signupUser(req.body);
    if (user.message) {
      res.status(409).send(user);
    } else if (user) {
      res.send(user);
    }
  } catch (e: any) {
    res.status(409).send(e.message);
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
