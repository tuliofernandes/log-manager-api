import request from "supertest";
import path from "path";
import fs from "fs";

import { App } from "@/app";
import { SaveLogsService } from "@/services/SaveLogsService";

jest.mock("@/services/SaveLogsService");

describe("[Controller] LogController", () => {
  const app = new App();

  afterAll(async () => {
    jest.clearAllMocks();
  });

  const file1Buffer = fs.readFileSync(
    path.resolve(__dirname, "../fixtures/files/AccessLogs_1.log")
  );
  const file2Buffer = fs.readFileSync(
    path.resolve(__dirname, "../fixtures/files/AccessLogs_2.log")
  );

  describe("POST /logs", () => {
    const routeUrl = "/logs";

    it("should be able to return BadRequestError and 404 status code if no file(s) are provided", async () => {
      const response = await request(app.server).post(routeUrl);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequestError: 'files' invalid or not provided",
      });
    });

    it("should be able to call LogService.parseAndSaveLogs with the files contents", async () => {
      const parseAndSaveLogsSpy = jest.spyOn(
        SaveLogsService.prototype,
        "parseAndSaveFromCsv"
      );

      await request(app.server)
        .post(routeUrl)
        .attach("files", "tests/fixtures/files/AccessLogs_1.log")
        .attach("files", "tests/fixtures/files/AccessLogs_2.log");

      expect(parseAndSaveLogsSpy).toHaveBeenCalledWith(file1Buffer);
      expect(parseAndSaveLogsSpy).toHaveBeenCalledWith(file2Buffer);
    });

    it("should be able to return 201 created after logs are created by the service", async () => {
      const response = await request(app.server)
        .post(routeUrl)
        .attach("files", "tests/fixtures/files/AccessLogs_1.log");

      expect(response.status).toBe(201);
    });
  });
});
