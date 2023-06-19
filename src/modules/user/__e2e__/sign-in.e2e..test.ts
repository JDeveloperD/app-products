import { MongoMemoryServer } from "mongodb-memory-server";
import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../../app";

describe("User / Sign In", () => {
  const request = supertest(app.init());

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  test("test", async () => {
    const response = await request.get("/api/v1/users");
    expect(response.status).toBe(401);
  });
});
