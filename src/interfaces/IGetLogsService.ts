import { ILog } from "./ILog";

export interface IGetLogsService {
  queryWithFilter(
    startDate: Date,
    endDate: Date,
    messagePattern?: string
  ): Promise<ILog[]>;
}
