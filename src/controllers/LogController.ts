import { BadRequestError } from "@/errors/BadRequestError";
import { Request, Response } from "express";

interface IController {
  handle(request: Request, response: Response): Promise<Response>;
}

export class UploadLogsController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { files } = request;

      if (!files || files.length === 0) {
        throw new BadRequestError("'files' invalid or not provided");
      }

      return response.json({});
    } catch (error) {
      if ((error as Error).message.includes("BadRequest")) {
        return response.status(400).json({
          error: (error as Error).message,
        });
      }

      return response.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
