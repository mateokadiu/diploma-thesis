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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.getTasks = exports.getTask = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
function createTask(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const task = yield task_model_1.default.create(input);
            return task.toJSON();
        }
        catch (e) {
            return { message: "Task not created!" };
        }
    });
}
exports.createTask = createTask;
const getTask = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findById(_id);
        return task;
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.getTask = getTask;
const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.find();
        return tasks;
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.getTasks = getTasks;
const editTask = (_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findOneAndUpdate({ _id }, Object.assign({}, data), { returnDocument: "after" });
        return task === null || task === void 0 ? void 0 : task.toJSON();
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.editTask = editTask;
