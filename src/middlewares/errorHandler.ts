import { Request, Response, NextFunction } from "express";

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (error.message.includes("BadRequestError")) {
    return response.status(400).json({
      error: error.message,
    });
  }

  // Omit sensitive errors from the response
  return response.status(500).json({
    error: "Internal Server Error",
  });
}

export default errorHandler;
