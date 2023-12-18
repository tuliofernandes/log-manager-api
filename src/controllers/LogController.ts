import { Request, Response } from "express";

import { BadRequestError } from "../errors/BadRequestError";
import { LogRepository } from "../repositories/LogRepository";
import { SaveLogsService } from "../services/SaveLogsService";

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

      // TODO: Check if files are valid via mimetype

      const logRepository = new LogRepository();
      const saveLogsService = new SaveLogsService(logRepository);

      for (const file of files as Express.Multer.File[]) {
        await saveLogsService.parseAndSaveFromCsv(file.buffer);
      }

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
