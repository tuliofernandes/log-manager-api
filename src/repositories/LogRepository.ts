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
}
