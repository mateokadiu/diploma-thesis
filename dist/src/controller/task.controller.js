"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskHandler = exports.getTaskHandler = exports.editTaskHandler = exports.getEmployeeTasksHandler = exports.getTasksHandler = exports.createTaskHandler = void 0;
const task_service_1 = require("../service/task.service");
function createTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield (0, task_service_1.createTask)(req.body);
            if (task) {
                res.send(task);
            }
            else {
                res.send({ message: "Error!" });
            }
        }
        catch (e) {
            res.status(409).send(e.message);
        }
    });
}
exports.createTaskHandler = createTaskHandler;
function getTasksHandler({ params }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tasks = yield (0, task_service_1.getTasks)();
            if (tasks)
                tasks = tasks.filter((task) => task.userId.toString() === params._id);
            return res.status(200).send(tasks);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    });
}
exports.getTasksHandler = getTasksHandler;
function getEmployeeTasksHandler({ params }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tasks = yield (0, task_service_1.getTasks)();
            if (tasks)
                tasks = tasks.filter((task) => task.to === params.email);
            return res.status(200).send(tasks);
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    });
}
exports.getEmployeeTasksHandler = getEmployeeTasksHandler;
function editTaskHandler({ body, params }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield (0, task_service_1.editTask)(params._id, body);
            if (task)
                res.status(200).send(task);
            else
                res.send({ message: "Update failed!" });
        }
        catch (e) { }
    });
}
exports.editTaskHandler = editTaskHandler;
const getTaskHandler = ({ params }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, task_service_1.getTask)(params._id);
    if (task)
        res.status(200).send(task);
    else
        res.send({ message: "Cannot find task!" });
});
exports.getTaskHandler = getTaskHandler;
function deleteTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (res === null || res === void 0 ? void 0 : res.task.remove());
            res.json({
                message: `Task with id ${req.params._id} was deleted successfully!`,
            });
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    });
}
exports.deleteTaskHandler = deleteTaskHandler;
