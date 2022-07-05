import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { Login, UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";

export async function signupUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "confirmPassword">
  >
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    return { message: `This email address is already in use.` };
  }
}

export const changePassword = async (_id: string, password: string) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id }, { password });
    return user;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};

export const loginUser = async ({ email }: Login) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};
