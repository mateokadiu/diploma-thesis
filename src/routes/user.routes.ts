import express, { Request, Response, Router } from "express";
import { omit } from "lodash";
import {
  deleteUserHandler,
  editUserHandler,
  getPaginatedUsers,
  getUsersHandler,
} from "../controller/user.controller";
// import { deserializeUser } from "../middleware/deserializeUser";
import { findUserMiddleware } from "../middleware/findUser.middleware";
// import { requireUser } from "../middleware/requireUser";

const router: Router = express.Router();

// router.use(deserializeUser, requireUser);

router.get("/api/users/:role/:email", [], getUsersHandler);

router.delete("/api/users/:_id", findUserMiddleware, deleteUserHandler);

router.patch("/api/user/:_id", findUserMiddleware, editUserHandler);
router.get("/api/users", [], getPaginatedUsers);

export { router as userRouter };

// async (req: Request, res: Response) => {
//   const { email, password, confirmPassword } = req.body;

//   const user = UserModel.build({ email, password, confirmPassword });
//   await user.save();
//   return res.status(201).send(user);
// }
