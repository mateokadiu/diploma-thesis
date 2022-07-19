"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.changePassword = exports.signAccessToken = exports.findSessionById = exports.createSession = exports.signRefreshToken = exports.signupUser = void 0;
const lodash_1 = require("lodash");
const user_model_1 = __importStar(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const session_model_1 = __importDefault(require("../models/session.model"));
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
function signRefreshToken({ userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield createSession({
            userId,
        });
        const refreshToken = (0, jwt_1.signJwt)({
            session: session._id,
        }, "refreshTokenPrivateKey", {
            expiresIn: "1y",
        });
        return refreshToken;
    });
}
exports.signRefreshToken = signRefreshToken;
function createSession({ userId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.create({ user: userId });
    });
}
exports.createSession = createSession;
function findSessionById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.findById(id);
    });
}
exports.findSessionById = findSessionById;
function signAccessToken(user) {
    const payload = (0, lodash_1.omit)(user.toJSON(), user_model_1.privateFields);
    const accessToken = (0, jwt_1.signJwt)(payload, "accessTokenPrivateKey", {
        expiresIn: "15m",
    });
    return accessToken;
}
exports.signAccessToken = signAccessToken;
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
