import express from "express";
import User, { UserInterface } from "../models/user.model";

// Registering user
export const createUser = async (req: express.Request, res: any) => {
  const user = new User(req.body);
  User.findOne({ emailAddress: req.body.emailAddress })
    .then(async (data: UserInterface | null) => {
      if (data) {
        return res.status(400).json({ message: "email already exists" });
      } else {
        const newUser = await user.save();
        return res.status(201).json(newUser);
      }
    })
    .catch((error: any) => {
      res.status(500).json({ message: error.message });
    });
};
