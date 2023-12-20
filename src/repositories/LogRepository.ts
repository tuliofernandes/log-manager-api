import { FilterQuery } from "mongoose";

import { DatabaseError } from "../errors/DatabaseError";
import { Log as LogSchema } from "../models/Log";
import { ILog } from "../interfaces/ILog";
import { ILogRepository } from "../interfaces/ILogRepository";

type LogsFilter = {
  startDate: Date;
  endDate: Date;
  messagePattern?: RegExp;
};

export class LogRepository implements ILogRepository {
  public async createMany(logs: ILog[]): Promise<void> {
    try {
      await LogSchema.insertMany(logs);
    } catch (error) {
      throw new DatabaseError((error as Error).message);
    }
  }

  public async findMany(filter: LogsFilter): Promise<ILog[]> {
    try {
      const filterQuery: FilterQuery<ILog> = {
        datetime: { $gte: filter.startDate, $lte: filter.endDate },
        description: { $regex: filter.messagePattern },
      };

      return await LogSchema.find(filterQuery);
    } catch (error) {
      throw new DatabaseError((error as Error).message);
    }
  }
}
