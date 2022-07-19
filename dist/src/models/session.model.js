"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_model_1 = require("./user.model");
class Session {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User })
], Session.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true, type: Boolean })
], Session.prototype, "valid", void 0);
exports.Session = Session;
const SessionModel = (0, typegoose_1.getModelForClass)(Session, {
    schemaOptions: {
        timestamps: true,
    },
});
exports.default = SessionModel;
