import express from "express";
import checkIfEmptyBody from "../midleware/handlingError";
import { authMiddleware } from "../midleware/auth";
import Todo from "../models/todo.model";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  tickTodo,
  TODO_IMAGE_DIRECTORY,
  updateTodo,
} from "../controllers/todo.controller";
import upload from "../utils/uploadFile";
import validate from "../midleware/validator";

let router = express.Router();

module.exports = (app: any) => {
  // Getting all todo
  router.get("/", authMiddleware, getTodo);

  // Getting one todo
  router.get("/:id", authMiddleware, getTodoById);

  // Create todo
  router.post(
    "/",
    authMiddleware,
    upload(TODO_IMAGE_DIRECTORY, "image/png" || "image/jpeg").single("image"),
    validate,
    checkIfEmptyBody,
    createTodo
  );

  // Updating todo
  router.patch(
    "/:id",
    authMiddleware,
    upload(
      TODO_IMAGE_DIRECTORY,
      "image/png" || "image/jpeg",
      "UPDATE",
      Todo,
      "imagePath"
    ).single("image"),
    validate,
    checkIfEmptyBody,
    updateTodo
  );

  // tick one todo
  router.get("/tick/:id", authMiddleware, tickTodo);

  // Deleting todo
  router.delete("/:id", authMiddleware, deleteTodo);

  app.use("/api/todo", router);
};
