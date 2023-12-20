import { ILogRepository } from "../interfaces/ILogRepository";
import { IGetLogsService } from "../interfaces/IGetLogsService";

export class GetLogsService implements IGetLogsService {
  constructor(private readonly logRepository: ILogRepository) {}

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
