import request from "supertest";

import { App } from "@/app";
import { GetLogsService } from "@/services/GetLogsService";
import { logsFixture } from "../fixtures/Log";

jest.mock("@/services/GetLogsService");

describe("[Controller] QueryLogsController", () => {
  const app = new App();

  afterAll(async () => {
    jest.clearAllMocks();
  });

  describe("GET /logs", () => {
    const routeUrl = "/logs";
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    const messagePattern = "valid message pattern";

    it("should be able to return BadRequestError and 400 status code if 'start_date' is invalid or not provided", async () => {
      const response = await request(app.server)
        .get(routeUrl)
        .query({ end_date: endDate, message_pattern: messagePattern });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequestError: 'start_date' invalid or not provided",
      });
    });

    it("should be able to return BadRequestError and 400 status code if 'end_date' is invalid or not provided", async () => {
      const response = await request(app.server)
        .get(routeUrl)
        .query({ start_date: startDate, message_pattern: messagePattern });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequestError: 'end_date' invalid or not provided",
      });
    });

    it("should be able to return BadRequestError and 400 status code if 'message_pattern' is invalid", async () => {
      const response = await request(app.server).get(routeUrl).query({
        start_date: startDate,
        end_date: endDate,
        message_pattern: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequestError: 'message_pattern' is invalid",
      });
    });

    it("should be able to call QueryLogsService.findMany with the correct parameters", async () => {
      const findManySpy = jest.spyOn(
        GetLogsService.prototype,
        "queryWithFilter"
      );

      await request(app.server).get(routeUrl).query({
        start_date: startDate,
        end_date: endDate,
        message_pattern: messagePattern,
      });

      expect(findManySpy).toHaveBeenCalledWith(
        new Date(startDate),
        new Date(endDate),
        messagePattern
      );
    });

    it("should be able to return 200 OK with the logs returned by GetLogsService if all parameters are valid", async () => {
      jest
        .spyOn(GetLogsService.prototype, "queryWithFilter")
        .mockResolvedValue(logsFixture);

      const response = await request(app.server).get(routeUrl).query({
        start_date: startDate,
        end_date: endDate,
        message_pattern: messagePattern,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(logsFixture);
    });
  });
});
