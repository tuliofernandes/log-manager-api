import mongoose from "mongoose";

import { connectDatabase } from "@/config/database/client";

import { LogRepository } from "@/repositories/LogRepository";
import { Log } from "@/models/Log";
import { logsFixture } from "@/tests/fixtures/Log";

describe("[Repository] Log", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Log.deleteMany();
    await mongoose.disconnect();
  });

  const sut = new LogRepository();

  it("should call mongoose insertMany method with correct values", async () => {
    jest.mock("@/models/Log");

    const createSpy = jest.spyOn(Log, "insertMany");

    await sut.createMany(logsFixture);

    expect(createSpy).toHaveBeenCalledWith(logsFixture);

    jest.restoreAllMocks();
  });

  it("should throw on a database error", async () => {
    jest.spyOn(Log, "insertMany").mockImplementationOnce(async () => {
      throw new Error("mongo connection error");
    });

    const promise = sut.createMany(logsFixture);

    await expect(promise).rejects.toThrow(
      new Error("DatabaseError: mongo connection error")
    );
  });

  it("should create the logs in the database", async () => {
    try {
      await sut.createMany(logsFixture);
    } catch (error) {
      fail("Promise should not reject");
    }
  });
});
