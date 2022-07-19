"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(res.locals.user.role)) {
            return res.status(403).send({
                message: `Role ${res.locals.user.role} is not allowed to access this resource!`,
            });
        }
        next();
    };
};
exports.default = authorizeRoles;
