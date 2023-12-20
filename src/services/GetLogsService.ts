import { IGetLogsService } from "../interfaces/IGetLogsService";
import { LogRepository } from "../repositories/LogRepository";

export class GetLogsService implements IGetLogsService {
  constructor(private readonly logRepository: LogRepository) {}

  async queryWithFilter(
    startDate: Date,
    endDate: Date,
    messagePattern: string = ""
  ) {
    const pattern = new RegExp(messagePattern, "i");
    const logs = await this.logRepository.findMany({
      startDate,
      endDate,
      messagePattern: pattern,
    });

    return logs;
  }
}
