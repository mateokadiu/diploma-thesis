import express, { Request, Response, Router } from "express";
import { omit } from "lodash";
import {
  deleteUserHandler,
  editUserHandler,
  getUsersHandler,
} from "../controller/user.controller";
import { findUserMiddleware } from "../middleware/findUser.middleware";

const router: Router = express.Router();

router.get("/api/users", [], getUsersHandler);

router.delete("/api/users/:_id", findUserMiddleware, deleteUserHandler);

router.patch("/api/users/:_id", findUserMiddleware, editUserHandler);

export { router as userRouter };

// async (req: Request, res: Response) => {
//   const { email, password, confirmPassword } = req.body;

//   const user = UserModel.build({ email, password, confirmPassword });
//   await user.save();
//   return res.status(201).send(user);
// }
