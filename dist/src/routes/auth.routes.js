"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const auth_roles_middleware_1 = __importDefault(require("../middleware/auth-roles.middleware"));
const require_user_middleware_1 = __importDefault(require("../middleware/require-user.middleware"));
const router = express_1.default.Router();
exports.authRouter = router;
router
    .route("/api/user")
    .post(require_user_middleware_1.default, (0, auth_roles_middleware_1.default)("Admin"), auth_controller_1.signupUserHandler);
router.route("/api/logout").get(require_user_middleware_1.default, auth_controller_1.logoutUserHandler);
router.post("/api/session/refresh", auth_controller_1.refreshAccessTokenHandler);
router
    .route("/api/change-password/:_id")
    .post(require_user_middleware_1.default, auth_controller_1.changePasswordHandler);
router.route("/api/session").post(auth_controller_1.createSessionHandler);
