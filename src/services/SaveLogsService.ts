import { ILog } from "@/interfaces/ILog";
import { ISaveLogsService } from "../interfaces/ISaveLogsService";
import { LogRepository } from "../repositories/LogRepository";
import { parseDatetime } from "../utils/parseDatetime";

export class SaveLogsService implements ISaveLogsService {
  constructor(private readonly logRepository: LogRepository) {}

  // TODO: tratar erros

  public async parseAndSaveFromCsv(data: string | Buffer): Promise<void> {
    const logs = await this.parseLogs(data.toString());
    await this.saveLogs(logs);
  }

  private async saveLogs(logs: ILog[]): Promise<void> {
    await this.logRepository.createMany(logs);
  }

  private async parseLogs(data: string): Promise<ILog[]> {
    const lines: string[] = data.split("\n");
    const logs: ILog[] = [];

    for (const line of lines) {
      if (line.trim() === "") continue;

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
}
