import checkIfEmptyBody from "../midleware/handlingError";
import express from "express";
import { createUser } from "../controllers/user.controller";

let router = express.Router();

module.exports = (app: any) => {
  // Create user
  router.post("/", checkIfEmptyBody, createUser);
  app.use("/api/user", router);
};
