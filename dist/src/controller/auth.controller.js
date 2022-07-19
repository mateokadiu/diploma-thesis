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
exports.getCurrentUserHandler = exports.logoutUserHandler = exports.changePasswordHandler = exports.signupUserHandler = exports.refreshAccessTokenHandler = exports.createSessionHandler = void 0;
const auth_service_1 = require("../service/auth.service");
const user_service_1 = require("../service/user.service");
const jwt_1 = require("../utils/jwt");
const lodash_1 = require("lodash");
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = "Invalid email or password!";
        const { email, password } = req.body;
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user) {
            return res.send(message);
        }
        const isValid = yield user.comparePasswords(user.password, password);
        if (!isValid) {
            return res.send(message);
        }
        // sign a access token
        const accessToken = (0, auth_service_1.signAccessToken)(user);
        // sign a refresh token
        const refreshToken = yield (0, auth_service_1.signRefreshToken)({ userId: user._id });
        // send the tokens
        return res.send({
            accessToken,
            refreshToken,
        });
    });
}
exports.createSessionHandler = createSessionHandler;
function refreshAccessTokenHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
        const decoded = (0, jwt_1.verifyJwt)(refreshToken, "refreshTokenPublicKey");
        if (!decoded) {
            return res.status(401).send("Could not refresh access token");
        }
        const session = yield (0, auth_service_1.findSessionById)(decoded.session);
        if (!session || !session.valid) {
            return res.status(401).send("Could not refresh access token");
        }
        const user = yield (0, user_service_1.findUserById)(String(session.user));
        if (!user) {
            return res.status(401).send("Could not refresh access token");
        }
        const accessToken = (0, auth_service_1.signAccessToken)(user);
        return res.send({ accessToken });
    });
}
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
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
function logoutUserHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.locals.user = null;
        res.status(200).send({ message: "Logged out successfully!" });
    });
}
exports.logoutUserHandler = logoutUserHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send(res.locals.user);
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
