import mongoose from "mongoose";

import { connectDatabase } from "@/config/database/client";
import { LogRepository } from "@/repositories/LogRepository";
import { Log } from "@/models/Log";
import { logsFixture } from "@/tests/fixtures/Log";

describe("[Repository] Log", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await Log.deleteMany();
    await mongoose.disconnect();
  });

  const sut = new LogRepository();

  describe("createMany", () => {
    it("should call mongoose insertMany method with correct values", async () => {
      jest.mock("@/models/Log");

      const createSpy = jest.spyOn(Log, "insertMany");

      await sut.createMany(logsFixture);

      expect(createSpy).toHaveBeenCalledWith(logsFixture);
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

  describe("findMany", () => {
    it("should call mongoose find method with correct values", async () => {
      jest.mock("@/models/Log");

      const findSpy = jest.spyOn(Log, "find");
      const startDate = new Date("2022-01-01");
      const endDate = new Date("2022-12-31");
      const messagePattern = "error";

      await sut.findMany({ startDate, endDate, messagePattern });

      const expectedFilter = {
        datetime: { $gte: startDate, $lte: endDate },
        description: { $regex: new RegExp(messagePattern, "i") },
      };

      expect(findSpy).toHaveBeenCalledWith(expectedFilter);
    });
  });
});
