import bcrypt from "bcrypt";
import e, { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import UserModel from "../models/user.model";
import { signupUser, loginUser, changePassword } from "../service/auth.service";
import { getUser } from "../service/user.service";
import { sendToken } from "../utils/jwtToken";
import sendEmail from "../utils/sendEmail";

export async function signupUserHandler({ body }: Request, res: Response) {
  try {
    const user = await signupUser(body);
    if (user.message) {
      res.status(409).send(user);
    } else if (user) {
      res.send(user);
    }
  } catch (e: any) {
    res.status(409).send(e.message);
  }
}

export async function changePasswordHandler(
  { body, params }: Request,
  res: Response
) {
  const user = await getUser(params?._id);

  const validPassword =
    user && (await user.comparePasswords(user?.password, body?.password));

  if (validPassword) {
    const updated = await changePassword(params._id, body.newPassword);
    if (updated?.email) {
      res.status(200).send({ message: "User password updated successfully!" });
    }
  } else {
    res.status(409).send({ message: "Check your password!" });
  }
}

//Forgot password => /api/password/forgot
export async function forgotPassword(req: any, res: any, next: any) {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: "User not found with this email!" });
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create rest password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf not have requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Task Organizer Password Recovery",
      message,
    });

    res.status(200).json({ message: `Email sent to: ${user.email}` });
  } catch (error: any) {
    //@ts-ignore
    user.resetPasswordToken = undefined;
    //@ts-ignore
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).send({ message: error.message });
  }
}

export async function loginUserHandler({ body }: Request, res: Response) {
  try {
    const user = await loginUser(body);

    const validPassword =
      user && user.comparePasswords(user.password, body.password);

    if (validPassword) {
      sendToken(user, 200, res);
    } else {
      res.status(400).json({ message: "Invalid email or password!" });
    }
  } catch (e: any) {
    res.status(500).json({ message: "Server is not responding!" });
  }
}

export async function logoutUserHandler(req: any, res: Response, next: any) {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({ message: "Logged out successfully!" });
}
