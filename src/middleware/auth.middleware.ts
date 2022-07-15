import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import UserModel from "../models/user.model";
import { verifyJwt } from "../utils/jwt";
export const isAuthenticatedUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) {
    return res
      .status(409)
      .send({ message: "Login first to access this resource!" });
  }

  const decoded: any = verifyJwt(accessToken, "accessTokenPublicKey");
  req.user = await UserModel.findById(decoded._id);
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
