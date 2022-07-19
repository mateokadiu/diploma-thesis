import bcrypt from "bcrypt";
import e, { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import UserModel from "../models/user.model";
import {
  signupUser,
  changePassword,
  signAccessToken,
  signRefreshToken,
  findSessionById,
} from "../service/auth.service";
import {
  findUserByEmail,
  findUserById,
  getUser,
} from "../service/user.service";
import { verifyJwt } from "../utils/jwt";

import { get } from "lodash";

export async function createSessionHandler(req: Request, res: Response) {
  const message = "Invalid email or password!";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }
  const isValid = await user.comparePasswords(user.password, password);

  if (!isValid) {
    return res.send(message);
  }
  // sign a access token
  const accessToken = signAccessToken(user);
  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });
  // send the tokens
  return res.send({
    accessToken,
    refreshToken,
  });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
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

export async function logoutUserHandler(req: any, res: Response, next: any) {
  res.locals.user = null;
  res.status(200).send({ message: "Logged out successfully!" });
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
