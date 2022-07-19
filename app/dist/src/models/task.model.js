"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const typegoose_1 = require("@typegoose/typegoose");
let Task = class Task {
};
__decorate([
    (0, typegoose_1.prop)({ required: true, type: mongoose_1.Types.ObjectId })
], Task.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: Date,
    })
], Task.prototype, "start", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: Date,
    })
], Task.prototype, "end", void 0);
__decorate([
    (0, typegoose_1.prop)({ minlength: 3, type: String, required: true })
], Task.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Object, required: true })
], Task.prototype, "color", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, required: false })
], Task.prototype, "allDay", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Object, required: false })
], Task.prototype, "resizable", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Task.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Task.prototype, "to", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true })
], Task.prototype, "from", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, default: "Assigned" })
], Task.prototype, "status", void 0);
Task = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], Task);
exports.Task = Task;
const TaskModel = (0, typegoose_1.getModelForClass)(Task);
exports.default = TaskModel;
