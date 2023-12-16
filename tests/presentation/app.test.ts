import request from "supertest";

import { App } from "@/presentation/app";

describe("App", () => {
  const app = new App().server;

  it("/health should return a JSON with the 'healthy' status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      health: "healthy",
    });
  });
});
