import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, {
  Login,
  privateFields,
  User,
  UserDocument,
} from "../models/user.model";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { DocumentType } from "@typegoose/typegoose";
import SessionModel from "../models/session.model";

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

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });

  return accessToken;
}

export const changePassword = async (_id: string, password: string) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id }, { password });
    return user;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};
