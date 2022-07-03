// import { Schema, model, Model, Document } from "mongoose";
import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import TaskModel, { Task } from "./task.model";

export interface Login {
  email: string;
  password: string;
}

@index({ email: 1 })
@pre<User>("save", async function (next) {
  // Hash password if the password is new or was updated
  const user = this;
  if (!user.isModified("password")) next();

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 10);
})
@pre<User>("remove", async function (next) {
  const user = this;
  await TaskModel.deleteMany({ userId: user._id });
  next();
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true, 
  },
})
export class User {
  @prop({ required: true, unique: true, type: String })
  email!: string;

  @prop({ required: true, minlength: 10, type: String })
  password!: string;

  @prop({ required: true, minlength: 3, type: String })
  firstName!: string;

  @prop({ required: true, minlength: 3, type: String })
  lastName!: string;

  @prop({ required: true, default: "Unemployed", type: String })
  role!: string;

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
  tasks?: Ref<Task>[];
  createdAt: Date;
  updatedAt: Date;
}

// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 10,
//     },
//     firstName: {
//       type: String,
//       required: true,
//       minlength: 3,
//     },
//     lastName: {
//       type: String,
//       required: true,
//       minlength: 3,
//     },
//     role: {
//       type: String,
//       required: true,
//       default: "Unemployed",
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre<UserDocument>("save", async function (next) {
//   let user = this as UserDocument;

//   if (!user.isModified("password")) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);

//   const hash = await bcrypt.hashSync(user.password, salt);

//   user.password = hash;

//   return next();
// });

// userSchema.virtual("tasks", {
//   ref: "Task",
//   localField: "_id",
//   foreignField: "userId",
// });

// userSchema.pre("remove", async function (next) {
//   const user = this;
//   await TaskModel.deleteMany({ userId: user._id });
//   next();
// });

const UserModel = getModelForClass(User);

export default UserModel;
