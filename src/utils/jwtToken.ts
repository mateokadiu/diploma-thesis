import { Response } from "express";
import { omit } from "lodash";
import { User } from "../models/user.model";

const sendToken = async (user: any, statusCode: any, res: Response) => {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.COOKIE_EXPIRES_TIME as string) *
          24 *
          60 *
          60 *
          1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({ user, token });
};

export { sendToken };
