import { BadRequestError } from "@/errors/BadRequestError";
import { LogRepository } from "@/repositories/LogRepository";
import { LogService } from "@/services/LogService";
import { Request, Response } from "express";

interface IController {
  handle(request: Request, response: Response): Promise<Response>;
}

export class UploadLogsController implements IController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const files = request.files;

      if (!files || files.length === 0) {
        throw new BadRequestError("'files' invalid or not provided");
      }

      // TODO: Check if files are valid via mimetype

      console.log((files as Express.Multer.File[])[0].buffer.toString());

      const logService = new LogService(new LogRepository());
      await logService.parseAndSaveLogs(
        (files as Express.Multer.File[])[0].buffer
      );

      return response.status(201).send();
    } catch (error) {
      if ((error as Error).message.includes("BadRequestError")) {
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
