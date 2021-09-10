import express from "express";
import User, { UserInterface } from "../models/user.model";

// Getting one user
export const getUserById = async (req: express.Request, res: any) => {
  const id = req.params.id;
  User.findById(id)
    .then((data: UserInterface | null) => {
      if (!data)
        res.status(404).send({ message: `Can not found User with id= ${id}` });
      else res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while find User with id= ${id}`,
      });
    });
};

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
