import app from "../../index";
import request from "supertest";
import * as db from "../helpers/db";
import { user } from "../helpers/user";

const agent = request.agent(app);

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => await db.close());

describe("Auth", () => {
  describe("/api/user/", () => {
    it("should insert data when called ", async () => {
      const response = await agent.post("/api/user/").send(user);
      expect(response.status).toEqual(201);
      expect(response.body.emailAddress).toEqual(user.emailAddress);
    });

    it("should fail  due to duplicated email ", async () => {
      const response = await agent.post("/api/user/").send(user);
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({ message: "email already exists" });
    });
  });

  describe("/api/auth/token", () => {
    // token not being sent - should respond with a 401
    test("It should successfully authorize", async () => {
      const response = await agent.post("/api/auth/token").send({
        emailAddress: user.emailAddress,
        password: user.password,
      });
      expect(response.status).toEqual(200);
    });
  });

  describe("/api/auth/token", () => {
    // token not being sent - should respond with a 401
    test("It should fail authorize due to wrong email password", async () => {
      const response = await agent.post("/api/auth/token").send({
        emailAddress: "this@fakemail",
        password: "password",
      });
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        message: "Credentials not found",
      });
    });

    // token not being sent - should respond with a 401
    test("It should require authorization", () => {
      return agent.get("/api/todo/").then((response) => {
        expect(response.statusCode).toBe(401);
      });
    });
  });
});
