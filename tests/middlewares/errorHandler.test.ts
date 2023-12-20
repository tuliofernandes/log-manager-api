import request from "supertest";
import express from "express";
import errorHandler from "@/middlewares/errorHandler";

describe("errorHandlingMiddleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.post("/bad-request", (req, res, next) => {
      next(new Error("BadRequestError: Invalid request"));
    });
    app.get("/internal-error", (req, res, next) => {
      next(new Error("Some sensible error"));
    });
    app.use(errorHandler);
  });

  it('should return 400 and the error message if the error message includes "BadRequestError"', async () => {
    const response = await request(app).post("/bad-request");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "BadRequestError: Invalid request",
    });
  });

  it('should return 500 and "Internal Server Error" if the error message does not include "BadRequestError"', async () => {
    const response = await request(app).get("/internal-error");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Internal Server Error",
    });
  });
});
