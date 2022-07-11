// Checks if user if authenticated or not

import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import UserModel from "../models/user.model";
export const isAuthenticatedUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(409)
      .send({ message: "Login first to access this resource!" });
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
  req.user = await UserModel.findById(decoded.user._id);
  next();
};

export const authorizeRoles = (...roles: any) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        message: `Role ${req.user.role} is not allowed to access this resource!`,
      });
    }
    next();
  };
};
