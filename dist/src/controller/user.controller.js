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
exports.editUserHandler = exports.deleteUserHandler = exports.getUserNumbers = exports.getPaginatedUsers = exports.getUsersHandler = void 0;
const lodash_1 = require("lodash");
const user_service_1 = require("../service/user.service");
function getUsersHandler({ params }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, user_service_1.getUsers)();
            return res.status(200).send(users);
        }
        catch (e) { }
    });
}
exports.getUsersHandler = getUsersHandler;
function getPaginatedUsers({ params, query }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield (0, user_service_1.getUsers)();
        const queryParams = query;
        const userId = queryParams === null || queryParams === void 0 ? void 0 : queryParams._id, pageNumber = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.pageNumber), pageSize = parseInt(queryParams === null || queryParams === void 0 ? void 0 : queryParams.pageSize);
        const initialPos = pageNumber * pageSize;
        if (initialPos > users.length) {
            users = users.filter((u) => (u === null || u === void 0 ? void 0 : u._id.toString()) !== userId);
            return res.status(200).json(users);
        }
        const usersPage = users
            .filter((u) => (u === null || u === void 0 ? void 0 : u._id.toString()) !== userId)
            .slice(initialPos, initialPos + pageSize);
        return res.status(200).json(usersPage);
    });
}
exports.getPaginatedUsers = getPaginatedUsers;
function getUserNumbers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, user_service_1.getUsers)();
            if (users) {
                const employeeNumber = users === null || users === void 0 ? void 0 : users.filter((user) => user.role == "Employee").length;
                const managerNumber = users === null || users === void 0 ? void 0 : users.filter((user) => user.role == "Manager").length;
                const adminNumber = users === null || users === void 0 ? void 0 : users.filter((user) => user.role == "Admin").length;
                res.status(200).send({ employeeNumber, managerNumber, adminNumber });
            }
        }
        catch (e) {
            res.status(500).send({ message: e.message });
        }
    });
}
exports.getUserNumbers = getUserNumbers;
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (res === null || res === void 0 ? void 0 : res.user.remove());
            res.json({
                message: `User with id ${req.params._id} was deleted successfully!`,
            });
        }
        catch (e) {
            res.status(500).json({ message: e.message });
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
function editUserHandler({ body, params }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.editUser)(params._id, body);
            if (user) {
                res.status(200).send((0, lodash_1.omit)(user, "password"));
            }
            else {
                res.send({ message: "Update failed!" });
            }
        }
        catch (e) { }
    });
}
exports.editUserHandler = editUserHandler;