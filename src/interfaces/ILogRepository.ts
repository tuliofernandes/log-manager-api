import { LogFilter } from "../types/LogFilter";
import { ILog } from "./ILog";

export interface ILogRepository {
  createMany(logs: ILog[]): Promise<void>;
  findMany(filter: LogFilter): Promise<ILog[]>;
}
