"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const router = express_1.default.Router();
exports.authRouter = router;
router.post("/api/user", auth_controller_1.signupUserHandler);
router.post("/api/login", auth_controller_1.loginUserHandler);
router.post("/api/change-password/:_id", auth_controller_1.changePasswordHandler);
