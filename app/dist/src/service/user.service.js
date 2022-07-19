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
exports.editUser = exports.findUserByEmail = exports.findUserById = exports.getUser = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({}, { password: 0 });
        if (users)
            return users;
        return null;
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.getUsers = getUsers;
const getUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id });
        return user;
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.getUser = getUser;
function findUserById(id) {
    return user_model_1.default.findById(id);
}
exports.findUserById = findUserById;
function findUserByEmail(email) {
    return user_model_1.default.findOne({ email });
}
exports.findUserByEmail = findUserByEmail;
const editUser = (_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ _id }, Object.assign({}, data), { returnDocument: "after" });
        return user === null || user === void 0 ? void 0 : user.toJSON();
    }
    catch (e) {
        throw { message: "Server is not responding!" };
    }
});
exports.editUser = editUser;
