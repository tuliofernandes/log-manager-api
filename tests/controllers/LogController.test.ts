import request from "supertest";

import { App } from "@/app";

describe("[Controller] LogController", () => {
  const app = new App().server;

  describe("POST /logs", () => {
    const routeUrl = "/logs";

    it("should be able to return BadRequestError and 404 status code if no file(s) are provided", async () => {
      const response = await request(app).post(routeUrl);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequestError: 'files' invalid or not provided",
      });
    });

    it("should be able to return 201 created if file(s) are provided", async () => {
      const response = await request(app)
        .post(routeUrl)
        .attach("files", "tests/fixtures/files/AccessLogs_1.log");

      expect(response.status).toBe(201);
    });
  });
});
