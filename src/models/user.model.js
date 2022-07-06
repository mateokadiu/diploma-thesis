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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.User = void 0;
// import { Schema, model, Model, Document } from "mongoose";
const typegoose_1 = require("@typegoose/typegoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const task_model_1 = __importStar(require("./task.model"));
let User = class User {
    comparePasswords(hashedPassword, candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(candidatePassword, hashedPassword);
        });
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true, type: String })
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 10, type: String })
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 3, type: String })
], User.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 3, type: String })
], User.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String })
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String })
], User.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: Date })
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typegoose_1.prop)({
        ref: () => task_model_1.Task,
        foreignField: "userId",
        localField: "_id",
    })
], User.prototype, "tasks", void 0);
User = __decorate([
    (0, typegoose_1.index)({ email: 1 }),
    (0, typegoose_1.pre)("save", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash password if the password is new or was updated
            const user = this;
            if (!user.isModified("password"))
                next();
            // Hash password with costFactor of 12
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        });
    }),
    (0, typegoose_1.pre)("remove", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this;
            yield task_model_1.default.deleteMany({ userId: user._id });
            next();
        });
    }),
    (0, typegoose_1.pre)("findOneAndUpdate", function (next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            if ((_a = this._update) === null || _a === void 0 ? void 0 : _a.password) {
                // @ts-ignore
                this._update.password = yield bcrypt_1.default.hash(this._update.password, 10);
            }
            else {
                next();
            }
        });
    })
    // @pre<User>("findOneAndUpdate", async function (next) {
    //   const _id = this.getQuery()?._id;
    //   const email = this?.getUpdate()?.email;
    //   if (email) {
    //     const user = await UserModel.findOne({ _id });
    //     if (user?.role === "Employee") {
    //       await TaskModel.updateMany({ to: user?.email }, { to: email });
    //     } else if (user?.role === "Manager") {
    //       await TaskModel.updateMany({ from: user?.email }, { from: email });
    //     }
    //   }
    //   next();
    //   // if(user?.role === 'Manager')
    //   // await TaskModel.
    // })
    ,
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
        },
    })
], User);
exports.User = User;
const UserModel = (0, typegoose_1.getModelForClass)(User);
exports.default = UserModel;
