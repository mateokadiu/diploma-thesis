import { Schema, model, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import TaskModel from "./task.model";

export interface Login {
  email: string;
  password: string;
}

export interface UserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
    },
    role: {
      type: String,
      required: true,
      default: "Unemployed",
    },
  },
  { timestamps: true }
);

userSchema.pre<UserDocument>("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "userId",
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await TaskModel.deleteMany({ userId: user._id });
  next();
});

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
