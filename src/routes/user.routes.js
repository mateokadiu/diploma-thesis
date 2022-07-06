"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
// import { deserializeUser } from "../middleware/deserializeUser";
const findUser_middleware_1 = require("../middleware/findUser.middleware");
// import { requireUser } from "../middleware/requireUser";
const router = express_1.default.Router();
exports.userRouter = router;
// router.use(deserializeUser, requireUser);
router.get("/api/users/:role/:email", [], user_controller_1.getUsersHandler);
router.delete("/api/user/:_id", findUser_middleware_1.findUserMiddleware, user_controller_1.deleteUserHandler);
router.patch("/api/user/:_id", findUser_middleware_1.findUserMiddleware, user_controller_1.editUserHandler);
router.get("/api/users", [], user_controller_1.getPaginatedUsers);
// async (req: Request, res: Response) => {
//   const { email, password, confirmPassword } = req.body;
//   const user = UserModel.build({ email, password, confirmPassword });
//   await user.save();
//   return res.status(201).send(user);
// }
