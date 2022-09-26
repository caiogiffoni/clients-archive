import { DataSource } from "typeorm";
import app from "../../src/app";
import request from "supertest";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { AppDataSource } from "../data-source";

describe("Test for POST method at /users", () => {
  let connection: DataSource;
  let testUser = {
    name: "Ana",
    email: "ana@kenzie.com",
    password: "Aa12345@",
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Create an user", async () => {
    const response = await request(app).post("/users").send(testUser);

    expect(response.status).toEqual(201);
    expect(response.body.id.length).toEqual(36);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: testUser.name,
        email: testUser.email,
      })
    );
  });

  test("Trying to create an user with the same email address", async () => {
    const response = await request(app).post("/users").send(testUser);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Trying to create an user without passing data", async () => {
    const response = await request(app).post("/users").send();

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });
});
