import { GetLogsService } from "@/services/GetLogsService";
import { LogRepository } from "@/repositories/LogRepository";
import { logsFixture } from "@/tests/fixtures/Log";

jest.mock("@/repositories/LogRepository");

describe("[Service] GetLogsService", () => {
  let getLogsService: GetLogsService;
  let logRepository: LogRepository;

  beforeEach(() => {
    logRepository = new LogRepository();
    getLogsService = new GetLogsService(logRepository);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("queryWithFilter", () => {
    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-12-31");
    const messagePattern = "valid message pattern";

    it("should call LogRepository.findMany with the correct values", async () => {
      const findManySpy = jest.spyOn(LogRepository.prototype, "findMany");

      await getLogsService.queryWithFilter(startDate, endDate, messagePattern);

      expect(findManySpy).toHaveBeenCalledWith({
        startDate,
        endDate,
        messagePattern: new RegExp(messagePattern, "i"),
      });
    });

    it("should return the same logs as returned by LogRepository", async () => {
      const findManySpy = jest.spyOn(LogRepository.prototype, "findMany");
      findManySpy.mockResolvedValue(logsFixture);

      const logs = await getLogsService.queryWithFilter(
        startDate,
        endDate,
        messagePattern
      );

      expect(logs).toEqual(logsFixture);
    });
  });
});
