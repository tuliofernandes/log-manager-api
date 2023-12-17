import { LogRepository } from "@/repositories/LogRepository";
import { Log } from "@/models/Log";

jest.mock("@/models/Log");

describe("[Repository] Log", () => {
  const logFixture = {
    ip: "192.168.0.11",
    date: new Date(),
    time: new Date(),
    type: "valid_type",
    version: "1.0.0",
    description: "blabla",
  };

  it("should call mongoose create method with correct values", async () => {
    const sut = new LogRepository();

    const createSpy = jest.spyOn(Log, "create");

    await sut.insert(logFixture);

    expect(createSpy).toHaveBeenCalledWith(logFixture);
  });
});
