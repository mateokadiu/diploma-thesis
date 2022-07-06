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
exports.loginUser = exports.changePassword = exports.signupUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importDefault(require("../models/user.model"));
function signupUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.create(input);
            return (0, lodash_1.omit)(user.toJSON(), "password");
        }
        catch (e) {
            return { message: `This email address is already in use.` };
        }
    });
}
exports.signupUser = signupUser;
const changePassword = (_id, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ _id }, { password });
        return user;
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.changePassword = changePassword;
const loginUser = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        return user;
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.loginUser = loginUser;
