import { SaveLogsService } from "@/services/SaveLogsService";
import { LogRepository } from "@/repositories/LogRepository";
import { logsFixture, logsFixtureCsv } from "@/tests/fixtures/Log";

jest.mock("@/repositories/LogRepository");

describe("[Service] LogService", () => {
  let saveLogsService: SaveLogsService;
  let logRepository: LogRepository;

  beforeEach(() => {
    logRepository = new LogRepository();
    saveLogsService = new SaveLogsService(logRepository);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("parseAndSaveLogs", () => {
    it("should call LogRepository.createMany with the correct values", async () => {
      const createManySpy = jest.spyOn(LogRepository.prototype, "createMany");

      await saveLogsService.parseAndSaveFromCsv(logsFixtureCsv);

      expect(createManySpy).toHaveBeenCalledWith(logsFixture);
    });
  });
});
