import Todo, { TodoInterface } from "../models/todo.model";
import deleteFile from "../utils/deleteFile";

//directory for uploading image
export const TODO_IMAGE_DIRECTORY = "public/upload/images";

// Getting all Todo
export const getTodo = async (req: any, res: any) => {
  try {
    let Todos: TodoInterface[];

    if (req.query.sort === "asc") {
      Todos = await Todo.find().sort({ deadline: "asc" });
    } else if (req.query.sort === "desc") {
      console.log("tes");
      Todos = await Todo.find().sort({ deadline: "desc" });
    } else {
      Todos = await Todo.find();
    }

    return res.status(200).json(Todos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Getting one Todo
export const getTodoById = async (req: any, res: any) => {
  const id = req.params.id;
  Todo.findById(id)
    .then((data: TodoInterface) => {
      if (!data)
        res.status(404).send({ message: `Can not found Todo with id= ${id}` });
      else res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while find Todo with id= ${id}`,
      });
    });
};

// Registering Todo
export const createTodo = async (req: any, res: any) => {
  if (req.file) {
    req.body.imagePath = req.file.path;
  }
  try {
    const todo = new Todo(req.body);
    const newTodo: TodoInterface = await todo.save();
    return res.status(201).json(newTodo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//update a Todo by id
export const updateTodo = (req: any, res: any) => {
  const id = req.params.id;

  if (req.file) {
    req.body.imagePath = req.file.path;
  }

  Todo.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data: TodoInterface) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update Todo with id= ${id}. data was not found!`,
        });
      } else {
        return res.send(data);
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || `Error updating Todo with id= ${id}`,
      });
    });
};

//tick a Todo by id
export const tickTodo = (req: any, res: any) => {
  const id = req.params.id;
  Todo.findByIdAndUpdate(
    id,
    { done: req.body.done },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((data: TodoInterface) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update Todo with id= ${id}. data was not found!`,
        });
      } else {
        return res.send(data);
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || `Error updating Todo with id= ${id}`,
      });
    });
};

// HARD Delete a Todo by id
export const deleteTodo = (req: any, res: any) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id)
    .then((data: TodoInterface) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete Todo with id= ${id}. data was not found!`,
        });
      } else {
        deleteFile(data.imagePath ? data.imagePath : "null");
        return res.send({
          message: "Todo was deleted successfully!",
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || `Could not delete Todo with id= ${id}`,
      });
    });
};
