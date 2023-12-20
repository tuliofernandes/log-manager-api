import { NextFunction, Request, Response } from "express";

import { IController } from "../interfaces/IController";
import { LogRepository } from "../repositories/LogRepository";
import { GetLogsService } from "../services/GetLogsService";
import { BadRequestError } from "../errors/BadRequestError";

export class QueryLogsController implements IController {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const startDate = new Date(request.query.start_date as string);
      const endDate = new Date(request.query.end_date as string);
      const messagePattern = request.query.message_pattern as string;

      if (isNaN(startDate.getTime()))
        throw new BadRequestError("'start_date' invalid or not provided");
      if (isNaN(endDate.getTime()))
        throw new BadRequestError("'end_date' invalid or not provided");
      if (messagePattern === "")
        throw new BadRequestError("'message_pattern' is invalid");

      const logRepository = new LogRepository();
      const getLogsService = new GetLogsService(logRepository);
      const logs = await getLogsService.queryWithFilter(
        startDate,
        endDate,
        messagePattern
      );

      return response.status(200).send(logs);
    } catch (error) {
      next(error);
    }
  }
}
