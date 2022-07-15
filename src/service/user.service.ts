import UserModel, { Login } from "../models/user.model";

export const getUsers = async () => {
  try {
    const users = await UserModel.find({}, { password: 0 });
    if (users) return users;
    return null;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};

export const getUser = async (_id: string) => {
  try {
    const user = await UserModel.findOne({ _id });
    return user;
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export const editUser = async (_id: string, data: any) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: "after" }
    );

    return user?.toJSON();
  } catch (e: any) {
    throw { message: "Server is not responding!" };
  }
};
