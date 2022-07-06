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
exports.loginUserHandler = exports.changePasswordHandler = exports.signupUserHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = require("lodash");
const auth_service_1 = require("../service/auth.service");
const user_service_1 = require("../service/user.service");
function signupUserHandler({ body }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, auth_service_1.signupUser)(body);
            if (user.message) {
                res.status(409).send(user);
            }
            else if (user) {
                res.send(user);
            }
        }
        catch (e) {
            res.status(409).send(e.message);
        }
    });
}
exports.signupUserHandler = signupUserHandler;
function changePasswordHandler({ body, params }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.getUser)(params === null || params === void 0 ? void 0 : params._id);
        const validPassword = user && (yield user.comparePasswords(user === null || user === void 0 ? void 0 : user.password, body === null || body === void 0 ? void 0 : body.password));
        if (validPassword) {
            const updated = yield (0, auth_service_1.changePassword)(params._id, body.newPassword);
            if (updated === null || updated === void 0 ? void 0 : updated.email) {
                res.status(200).send({ message: "User password updated successfully!" });
            }
        }
        else {
            res.status(409).send({ message: "Check your password!" });
        }
    });
}
exports.changePasswordHandler = changePasswordHandler;
function loginUserHandler({ body }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, auth_service_1.loginUser)(body);
            const validPassword = user && (yield bcrypt_1.default.compare(body.password, user.password));
            if (validPassword) {
                res.status(200).json((0, lodash_1.omit)(user.toJSON(), "password"));
            }
            else {
                res.status(400).json({ message: "Invalid email or password!" });
            }
        }
        catch (e) {
            res.status(500).json({ message: "Server is not responding!" });
        }
    });
}
exports.loginUserHandler = loginUserHandler;
