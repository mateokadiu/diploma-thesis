"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controller/task.controller");
const auth_roles_middleware_1 = __importDefault(require("../middleware/auth-roles.middleware"));
const findTask_middleware_1 = require("../middleware/findTask.middleware");
const require_user_middleware_1 = __importDefault(require("../middleware/require-user.middleware"));
const router = express_1.default.Router();
exports.taskRouter = router;
router
    .route("/api/task")
    .post(require_user_middleware_1.default, (0, auth_roles_middleware_1.default)("Manager"), task_controller_1.createTaskHandler);
router.route("/api/task/:_id").get(require_user_middleware_1.default, task_controller_1.getTaskHandler);
router
    .route("/api/task/:_id")
    .patch(require_user_middleware_1.default, findTask_middleware_1.findTaskMiddleware, task_controller_1.editTaskHandler);
router
    .route("/api/task/:_id")
    .delete(require_user_middleware_1.default, (0, auth_roles_middleware_1.default)("Manager"), findTask_middleware_1.findTaskMiddleware, task_controller_1.deleteTaskHandler);
router.route("/api/tasks/manager/:_id").get(require_user_middleware_1.default, [], task_controller_1.getTasksHandler);
router
    .route("/api/tasks/employee/:email")
    .get(require_user_middleware_1.default, [], task_controller_1.getEmployeeTasksHandler);
