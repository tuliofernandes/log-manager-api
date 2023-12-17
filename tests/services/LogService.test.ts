import { LogService } from "@/services/LogService";
import { LogRepository } from "@/repositories/LogRepository";
import { logsFixture, logsFixtureCsv } from "@/tests/fixtures/Log";

jest.mock("@/repositories/LogRepository");

describe("[Service] LogService", () => {
  let logService: LogService;
  let logRepository: LogRepository;

  beforeEach(() => {
    logRepository = new LogRepository();
    logService = new LogService(logRepository);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("parseLogs", () => {
    it("should parse logs correctly", async () => {
      const result = await logService.parseLogs(logsFixtureCsv);

      expect(result).toEqual(logsFixture);
    });

    it("should skip empty lines", async () => {
      const data = `109.76.175.111;27-Feb-2022;22:29:32.000;Sonsing;8.8;174766704-8;De-engineered optimizing forecast;in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non
      178.8.106.32;22-Jan-2023;3:44:53.000;Sonair;6.1.8;596167229-8;De-engineered intangible knowledge base;metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra

      240.246.127.13;30-Mar-2022;16:34:08.000;Asoka;0.50;640612225-9;Diverse foreground challenge;nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor`;

      const result = await logService.parseLogs(data);

      expect(result).toEqual(logsFixture);
    });
  });

  describe("saveLogs", () => {
    it("should call log repository createMany method with correct values", async () => {
      const createManySpy = jest.spyOn(logRepository, "createMany");

      await logService.saveLogs(logsFixture);

      expect(createManySpy).toHaveBeenCalledWith(logsFixture);
    });
  });

  describe("parseAndSaveLogs", () => {
    it("should call parseLogs correctly", async () => {
      const parseLogsSpy = jest.spyOn(LogService.prototype, "parseLogs");

      await logService.parseAndSaveLogs(logsFixtureCsv);

      expect(parseLogsSpy).toHaveBeenCalledWith(logsFixtureCsv);
    });
  });
});
