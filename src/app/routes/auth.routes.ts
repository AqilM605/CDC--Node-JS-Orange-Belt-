import express from "express";
import checkIfEmptyBody from "../midleware/handlingError";
import { generateToken } from "../controllers/auth.controller";

let router = express.Router();
module.exports = (app: any) => {
  //route to generate token
  router.post("/token", checkIfEmptyBody, generateToken);
  app.use("/api/auth", router);
};
