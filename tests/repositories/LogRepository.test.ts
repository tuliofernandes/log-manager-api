import mongoose from "mongoose";

import { connectDatabase } from "@/config/database/client";

import { LogRepository } from "@/repositories/LogRepository";
import { Log } from "@/models/Log";

describe("[Repository] Log", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Log.deleteMany();
    await mongoose.disconnect();
  });

  const sut = new LogRepository();

  const logFixture = {
    ip: "192.168.0.11",
    date: new Date(),
    time: new Date(),
    type: "valid_type",
    version: "1.0.0",
    description: "blabla",
  };

  it("should call mongoose create method with correct values", async () => {
    jest.mock("@/models/Log");

    const createSpy = jest.spyOn(Log, "create");

    await sut.insert(logFixture);

    expect(createSpy).toHaveBeenCalledWith(logFixture);

    jest.restoreAllMocks();
  });

  it("should throw on a database error", async () => {
    jest.spyOn(Log, "create").mockImplementationOnce(async () => {
      throw new Error("mongo connection error");
    });

    const promise = sut.insert(logFixture);

    await expect(promise).rejects.toThrow(
      new Error("DatabaseError: mongo connection error")
    );
  });

  it("should create a log in the database", async () => {
    const created = await sut.insert(logFixture);

    expect(created).toBeTruthy();
    expect(created?.ip).toBe("192.168.0.11");
  });
});
