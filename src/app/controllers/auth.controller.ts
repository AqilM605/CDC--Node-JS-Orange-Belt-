import express from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";

export const generateToken = async (req: express.Request, res: any) => {
  try {
    await UserModel.findOne({
      emailAddress: req.body.emailAddress,
    }).then(async (user) => {
      if (user) {
        await user
          .isValidPassword(req.body.password)
          .then((isValidPassword: boolean) => {
            if (isValidPassword) {
              const token = jwt.sign({ user: user }, process.env.SIGN_KEY!!, {
                expiresIn: "1d",
              });
              return res.json({ token });
            } else {
              return res.status(400).send({ message: "Credentials not found" });
            }
          });
      } else {
        return res.status(400).send({ message: "Credentials not found" });
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
    });
  }
};
