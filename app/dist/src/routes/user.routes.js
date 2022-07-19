"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const user_controller_1 = require("../controller/user.controller");
const auth_roles_middleware_1 = __importDefault(require("../middleware/auth-roles.middleware"));
const findUser_middleware_1 = require("../middleware/findUser.middleware");
const require_user_middleware_1 = __importDefault(require("../middleware/require-user.middleware"));
const router = express_1.default.Router();
exports.userRouter = router;
router.route("/api/users/:role/:email").get(require_user_middleware_1.default, [], user_controller_1.getUsersHandler);
router
    .route("/api/users/numbers")
    .get(require_user_middleware_1.default, (0, auth_roles_middleware_1.default)("Admin"), user_controller_1.getUserNumbers);
router
    .route("/api/user/:_id")
    .delete(require_user_middleware_1.default, (0, auth_roles_middleware_1.default)("Admin"), findUser_middleware_1.findUserMiddleware, user_controller_1.deleteUserHandler);
router
    .route("/api/user/:_id")
    .patch(require_user_middleware_1.default, findUser_middleware_1.findUserMiddleware, user_controller_1.editUserHandler);
router.route("/api/users").get(require_user_middleware_1.default, [], user_controller_1.getPaginatedUsers);
router.route("/api/users/me").get(require_user_middleware_1.default, auth_controller_1.getCurrentUserHandler);
