import app from "../../index"; // Link to your server file
import request from "supertest";
import * as db from "../helpers/db";

const { user } = require("../helpers/user");
const agent = request.agent(app);

let user_id: string;
let todo_id: string;

beforeAll(async () => {
  await db.connect();
  const newUser = await request(app).post("/api/user/").send(user);
  user_id = newUser.body._id;
  const loginRes = await agent.post("/api/auth/token").send({
    emailAddress: user.emailAddress,
    password: user.password,
  });
  agent.set("Authorization", `bearer ${loginRes.body.token}`);
});

afterAll(async () => await db.close());

describe("/api/todo/", () => {
  describe("POST", () => {
    it("should insert todo when called ", async () => {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      const todo = {
        description: "todo description",
        done: true,
        deadline: date,
      };

      const response = await agent.post("/api/todo/").send(todo);
      expect(response.status).toEqual(201);
      expect(response.body.description).toEqual(todo.description);
      todo_id = response.body._id;
    });
  });

  describe("PATCH", () => {
    it("should update todo description", async () => {
      const todo = {
        description: "updated description",
      };
      const response = await agent.patch("/api/todo/" + todo_id).send(todo);

      expect(response.status).toEqual(200);
      expect(response.body.description).toEqual(todo.description);
    });

    it("should fail due to unknown id ", async () => {
      const todo = {
        description: "updated description",
      };
      const response = await agent
        .patch("/api/todo/60d44e393c8bcf1e4cd250ef")
        .send(todo);
      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        message:
          "Cannot update Todo with id= 60d44e393c8bcf1e4cd250ef. data was not found!",
      });
    });
  });

  describe("GET", () => {
    it("should return data by id", async () => {
      const response = await agent.get("/api/todo/" + todo_id);
      expect(response.status).toEqual(200);
      expect(response.body._id).toContain(todo_id);
    });

    it("should return all data ", async () => {
      const response = await agent.get("/api/todo");
      try {
        expect(response.body).toEqual({ message: "empty records" });
      } catch {
        expect(response.status).toBe(200);
      }
    });
  });

  describe("DELETE", () => {
    it("should  delete data by id", async () => {
      const response = await agent.delete("/api/todo/" + todo_id);
      expect(response.body).toEqual({
        message: "Todo was deleted successfully!",
      });
    });

    it("should fail due to id not found", async () => {
      const response = await agent.delete("/api/todo/" + todo_id);
      expect(response.body).toEqual({
        message:
          "Cannot delete Todo with id=" +
          " " +
          todo_id +
          ". data was not found!",
      });
    });
  });
});
