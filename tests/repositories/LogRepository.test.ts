import { LogRepository } from "@/repositories/LogRepository";
import { Log } from "@/models/Log";

jest.mock("@/models/Log");

describe("[Repository] Log", () => {
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
    const createSpy = jest.spyOn(Log, "create");

    await sut.insert(logFixture);

    expect(createSpy).toHaveBeenCalledWith(logFixture);
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
});
