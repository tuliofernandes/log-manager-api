import { NextFunction, Request, Response } from "express";

import { IController } from "../interfaces/IController";

import { BadRequestError } from "../errors/BadRequestError";
import { LogRepository } from "../repositories/LogRepository";
import { SaveLogsService } from "../services/SaveLogsService";

export class UploadLogsController implements IController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const { files } = request;

      if (!files || files.length === 0)
        throw new BadRequestError("'files' invalid or not provided");

      const logRepository = new LogRepository();
      const saveLogsService = new SaveLogsService(logRepository);

      for (const file of files as Express.Multer.File[])
        await saveLogsService.parseAndSaveFromCsv(file.buffer);

      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
