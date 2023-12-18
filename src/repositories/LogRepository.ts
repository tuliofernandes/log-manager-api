import { FilterQuery } from "mongoose";

import { DatabaseError } from "../errors/DatabaseError";
import { Log as LogSchema, ILog } from "../models/Log";

export class LogRepository {
  public async createMany(logs: ILog[]): Promise<void> {
    try {
      await LogSchema.insertMany(logs);
    } catch (error) {
      throw new DatabaseError((error as Error).message);
    }
  }

  public async findMany(
    startDate: Date,
    endDate: Date,
    messagePattern: string
  ): Promise<ILog[]> {
    try {
      const filter: FilterQuery<ILog> = {
        datetime: { $gte: startDate, $lte: endDate },
        description: { $regex: new RegExp(messagePattern, "i") },
      };

      return await LogSchema.find(filter);
    } catch (error) {
      throw new DatabaseError((error as Error).message);
    }
  }
}
