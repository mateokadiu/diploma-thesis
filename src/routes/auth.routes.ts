import express, { Router } from "express";
import {
  loginUserHandler,
  signupUserHandler,
} from "../controller/auth.controller";

const router: Router = express.Router();

router.post("/api/signup", signupUserHandler);

router.post("/api/login", loginUserHandler);

export { router as authRouter };
