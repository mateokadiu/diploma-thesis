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
exports.findTaskMiddleware = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
function findTaskMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let task;
        try {
            task = yield task_model_1.default.findById(req.params._id);
            if (task == null) {
                return res
                    .status(404)
                    .json({ message: `Cannot find task with id '${req.params._id}'!` });
            }
            res.task = task;
            next();
        }
        catch (e) {
            return res.status(500).json({ message: e.message });
        }
    });
}
exports.findTaskMiddleware = findTaskMiddleware;
