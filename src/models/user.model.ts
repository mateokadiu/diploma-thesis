// import { Schema, model, Model, Document } from "mongoose";
import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import TaskModel, { Task } from "./task.model";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified",
];
export interface Login {
  email: string;
  password: string;
}

@index({ email: 1 })
//hash password on save
@pre<User>("save", async function (next) {
  // Hash password if the password is new or was updated
  const user = this;
  if (!user.isModified("password")) next();

  // Hash password with costFactor of 10
  this.password = await bcrypt.hash(this.password, 10);
})
//remove all manager tasks
@pre<User>("remove", async function (next) {
  const user = this;
  await TaskModel.deleteMany({ userId: user._id });
  next();
})
//hash updated password
@pre<User>("findOneAndUpdate", async function (next) {
  // @ts-ignore
  if (this._update?.password) {
    // @ts-ignore
    this._update.password = await bcrypt.hash(this._update.password, 10);
  } else {
    next();
  }
})
//set model options
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

//define user class
export class User {
  @prop({ required: true, unique: true, type: String })
  email!: string;

  @prop({ required: true, minlength: 10, type: String })
  password!: string;

  @prop({ required: true, minlength: 3, type: String })
  firstName!: string;

  @prop({ required: true, minlength: 3, type: String })
  lastName!: string;

  @prop({ required: true, type: String })
  role!: string;

  @prop({ required: true, type: String })
  gender!: string;

  @prop({ required: true, type: Date })
  dateOfBirth!: Date;

  @prop({
    ref: () => Task,
    foreignField: "userId",
    localField: "_id",
  })
  public tasks!: Ref<Task>[];

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export interface UserDocument {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  dateOfBirth: Date;
  gender: string;
  tasks?: Ref<Task>[];
  createdAt: Date;
  updatedAt: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
