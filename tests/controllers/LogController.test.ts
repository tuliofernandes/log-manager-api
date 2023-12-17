import request from "supertest";

import { App } from "@/app";

describe("[Controller] LogController", () => {
  const app = new App().server;

  describe("POST /logs", () => {
    const routeUrl = "/logs";

    it("should be able to throw an error if no file(s) are provided", async () => {
      const response = await request(app).post(routeUrl);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "BadRequest: 'files' invalid or not provided",
      });
    });
  });
});
