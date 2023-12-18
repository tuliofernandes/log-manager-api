import request from "supertest";
import path from "path";
import fs from "fs";

import { App } from "@/app";
import { LogService } from "@/services/LogService";

jest.mock("@/services/LogService");

describe("[Controller] LogController", () => {
  const app = new App().server;

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
      const response = await request(app).post(routeUrl);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequestError: 'files' invalid or not provided",
      });
    });

    it("should be able to call LogService.parseAndSaveLogs with the files contents", async () => {
      const parseAndSaveLogsSpy = jest.spyOn(
        LogService.prototype,
        "parseAndSaveLogs"
      );

      await request(app)
        .post(routeUrl)
        .attach("files", "tests/fixtures/files/AccessLogs_1.log")
        .attach("files", "tests/fixtures/files/AccessLogs_2.log");

      expect(parseAndSaveLogsSpy).toHaveBeenCalledWith(file1Buffer);
      expect(parseAndSaveLogsSpy).toHaveBeenCalledWith(file2Buffer);
    });

    it("should be able to return 201 created after logs are created by the service", async () => {
      const response = await request(app)
        .post(routeUrl)
        .attach("files", "tests/fixtures/files/AccessLogs_1.log");

      expect(response.status).toBe(201);
    });
  });
});
