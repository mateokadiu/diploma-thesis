"use strict";
// import { NextFunction, Request, Response } from "express";
// import { StringNullableChain } from "lodash";
// import { findUserById } from "../service/auth.service";
// import AppError from "../utils/appError";
// import { verifyJwt } from "./jwt";
// export const deserializeUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let access_token;
//     if (!req.headers.authorization) {
//       return res.status(401).send({ message: "You are not authorized!" });
//     }
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       access_token = req.headers.authorization.split(" ")[1];
//     } else if (req.cookies.accessToken) {
//       access_token = req.cookies.accessToken;
//     } else {
//       return res.status(401).send({ message: "You are not logged in!" });
//     }
//     if (!access_token) {
//       return res.status(401).send({ message: "You are not logged in!" });
//     }
//     const decoded = verifyJwt<{ sub: string }>(access_token);
//     if (!decoded) {
//       res.status(401).send({ message: "Invalid token or user doesn't exist" });
//     }
//     next();
//   } catch (e: any) {}
// };
