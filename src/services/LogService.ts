import { ILog } from "../models/Log";
import { LogRepository } from "../repositories/LogRepository";
import { parseDatetime } from "../utils/parseDatetime";

interface ILogService {
  parseLogs(data: string): Promise<ILog[]>;
  saveLogs(logs: ILog[]): Promise<void>;
  parseAndSaveLogs(data: string): Promise<void>;
}

export class LogService implements ILogService {
  constructor(private readonly logRepository: LogRepository) {} // Use camelCase for variable names

  async parseLogs(data: string): Promise<ILog[]> {
    const lines: string[] = data.split("\n");
    const logs: ILog[] = [];

    for (const line of lines) {
      if (line.trim() === "") {
        continue;
      }

      const [ip, date, time, type, version, logId, title, description] =
        line.split(";");
      const datetime: Date = parseDatetime(date, time);

      logs.push({
        ip: ip.trim(),
        datetime,
        type,
        version,
        logId,
        title,
        description,
      });
    }

    return logs;
  }

  async saveLogs(logs: ILog[]): Promise<void> {
    await this.logRepository.createMany(logs);
  }

  async parseAndSaveLogs(data: string | Buffer): Promise<void> {
    const logs = await this.parseLogs(data.toString());
    await this.saveLogs(logs);
  }
}
