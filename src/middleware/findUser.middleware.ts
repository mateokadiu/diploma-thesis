import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";

export async function findUserMiddleware(req: any, res: any, next: any) {
  let user;

  try {
    user = await UserModel.findById(req.params._id);
    if (user == null) {
      return res
        .status(404)
        .json({ message: `Cannot find user with id '${req.params._id}'!` });
    }
    res.user = user;
    next();
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
